<template>
  <div class="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#f2f2f7]">
    <div class="absolute inset-0 stripe-bg"></div>

    <div ref="globeContainer" class="relative z-10 w-full h-full"></div>

    <div v-if="isLoading" class="absolute inset-0 z-20 flex items-center justify-center bg-white/30 rounded-2xl">
      <div class="text-[#3d4762] text-center">
        <div class="mb-2 text-sm">loading globe...</div>
        <div class="text-xs text-[#7c88a8]">{{ loadingStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const globeContainer = ref(null)
const isLoading = ref(true)
const loadingStatus = ref('initializing')

let scene
let camera
let renderer
let animationId

let globeGroup
let pointsMesh
let arcGroup

let currentRotX = 0.32
let currentRotY = -0.58
let targetRotX = 0.32
let targetRotY = -0.58

let onMouseMove
let onResize

const disposableGeometries = []
const disposableMaterials = []

const addDisposable = (geometry, material) => {
  if (geometry) disposableGeometries.push(geometry)
  if (material) disposableMaterials.push(material)
}

const toCartesian = (latDeg, lonDeg, radius) => {
  const lat = THREE.MathUtils.degToRad(latDeg)
  const lon = THREE.MathUtils.degToRad(lonDeg)

  const x = radius * Math.cos(lat) * Math.cos(lon)
  const y = radius * Math.sin(lat)
  const z = radius * Math.cos(lat) * Math.sin(lon)

  return new THREE.Vector3(x, y, z)
}

const buildPointsGlobe = () => {
  const radius = 1.42
  const count = 24000

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const colorBlue = new THREE.Color('#5f77ff')
  const colorViolet = new THREE.Color('#9f5fff')
  const colorPink = new THREE.Color('#ff63c7')
  const colorOrange = new THREE.Color('#ff8463')
  const white = new THREE.Color('#fbfbff')

  const tempColor = new THREE.Color()

  for (let i = 0; i < count; i += 1) {
    const u = Math.random()
    const v = Math.random()

    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)

    const x = Math.sin(phi) * Math.cos(theta)
    const y = Math.cos(phi)
    const z = Math.sin(phi) * Math.sin(theta)

    const cluster = Math.sin(x * 6.2) + Math.cos(y * 8.3) + Math.sin(z * 5.6)
    const sparseMask = Math.random() < 0.15
    const shouldUse = cluster > 0.45 || sparseMask

    const idx = i * 3

    if (!shouldUse) {
      positions[idx] = 999
      positions[idx + 1] = 999
      positions[idx + 2] = 999

      colors[idx] = 1
      colors[idx + 1] = 1
      colors[idx + 2] = 1
      continue
    }

    const r = radius + (Math.random() - 0.5) * 0.012

    positions[idx] = x * r
    positions[idx + 1] = y * r
    positions[idx + 2] = z * r

    const t = (x + 1) / 2

    if (t < 0.32) {
      tempColor.copy(colorBlue).lerp(colorViolet, t / 0.32)
    } else if (t < 0.72) {
      tempColor.copy(colorViolet).lerp(colorPink, (t - 0.32) / 0.4)
    } else {
      tempColor.copy(colorPink).lerp(colorOrange, (t - 0.72) / 0.28)
    }

    const wash = THREE.MathUtils.clamp((1 - Math.abs(y) * 1.25) * 0.42, 0, 0.42)
    tempColor.lerp(white, wash)

    colors[idx] = tempColor.r
    colors[idx + 1] = tempColor.g
    colors[idx + 2] = tempColor.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.011,
    vertexColors: true,
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  })

  addDisposable(geometry, material)

  return new THREE.Points(geometry, material)
}

const buildArc = ({ from, to, color = '#8a4dff', lift = 0.55 }) => {
  const start = toCartesian(from.lat, from.lon, 1.22)
  const end = toCartesian(to.lat, to.lon, 1.22)

  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
  const control = mid.clone().normalize().multiplyScalar(1.22 + lift * 0.42)

  const curve = new THREE.QuadraticBezierCurve3(start, control, end)
  const points = curve.getPoints(140)

  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.86,
    blending: THREE.AdditiveBlending
  })

  const line = new THREE.Line(geometry, material)

  const markerGeometry = new THREE.SphereGeometry(0.016, 14, 14)
  const markerMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.8
  })

  const markerA = new THREE.Mesh(markerGeometry, markerMaterial)
  markerA.position.copy(start)
  const markerB = new THREE.Mesh(markerGeometry, markerMaterial)
  markerB.position.copy(end)

  const flowGeometry = new THREE.SphereGeometry(0.018, 12, 12)
  const flowMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 1
  })
  const flowDot = new THREE.Mesh(flowGeometry, flowMaterial)
  flowDot.position.copy(start)

  flowRunners.push({
    mesh: flowDot,
    curve,
    speed: 0.003 + Math.random() * 0.0024,
    offset: Math.random()
  })

  addDisposable(geometry, material)
  addDisposable(markerGeometry, markerMaterial)
  addDisposable(flowGeometry, flowMaterial)

  const group = new THREE.Group()
  group.add(line)
  group.add(markerA)
  group.add(markerB)
  group.add(flowDot)

  return group
}

const setupGlobe = async () => {
  try {
    const container = globeContainer.value
    if (!container) {
      loadingStatus.value = 'container not found'
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 80))

    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) {
      loadingStatus.value = 'container has no dimensions'
      return
    }

    loadingStatus.value = 'creating scene'
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100)
    camera.position.set(0.1, 0.06, 3.14)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    loadingStatus.value = 'building points globe'

    globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const landMask = await loadLandMask()
    pointsMesh = buildPointsGlobe(landMask)
    globeGroup.add(pointsMesh)

    const xian = { lat: 34.3416, lon: 108.9398 }

    const routes = [
      { to: { lat: 39.9042, lon: 116.4074 }, color: '#8b49ff', lift: 0.34 },
      { to: { lat: 31.2304, lon: 121.4737 }, color: '#ff58c7', lift: 0.32 },
      { to: { lat: 23.1291, lon: 113.2644 }, color: '#6d6cff', lift: 0.38 },
      { to: { lat: 22.5431, lon: 114.0579 }, color: '#7f6bff', lift: 0.4 },
      { to: { lat: 30.5728, lon: 104.0668 }, color: '#ff63c7', lift: 0.28 },
      { to: { lat: 30.5928, lon: 114.3055 }, color: '#8a7bff', lift: 0.3 },
      { to: { lat: 30.2741, lon: 120.1551 }, color: '#8b49ff', lift: 0.3 },
      { to: { lat: 32.0603, lon: 118.7969 }, color: '#6d6cff', lift: 0.3 },
      { to: { lat: 29.563, lon: 106.5516 }, color: '#ff58c7', lift: 0.33 },
      { to: { lat: 22.3193, lon: 114.1694 }, color: '#6d6cff', lift: 0.39 },
      { to: { lat: 1.3521, lon: 103.8198 }, color: '#8b49ff', lift: 0.58 },
      { to: { lat: 35.6762, lon: 139.6503 }, color: '#ff58c7', lift: 0.52 },
      { to: { lat: 37.5665, lon: 126.978 }, color: '#6d6cff', lift: 0.5 },
      { to: { lat: 25.2048, lon: 55.2708 }, color: '#8a7bff', lift: 0.6 },
      { to: { lat: 48.8566, lon: 2.3522 }, color: '#ff63c7', lift: 0.74 },
      { to: { lat: 51.5072, lon: -0.1276 }, color: '#6d6cff', lift: 0.78 },
      { to: { lat: 40.7128, lon: -74.006 }, color: '#8b49ff', lift: 0.92 },
      { to: { lat: 34.0522, lon: -118.2437 }, color: '#ff58c7', lift: 0.84 },
      { to: { lat: -33.8688, lon: 151.2093 }, color: '#6d6cff', lift: 1.02 },
      { to: { lat: 55.7558, lon: 37.6173 }, color: '#8a7bff', lift: 0.76 }
    ]

    arcGroup = new THREE.Group()
    routes.forEach((route) => {
    arcGroup.add(
      buildArc({
          from: xian,
          to: route.to,
          color: route.color,
          lift: route.lift
      })
    )
    })

    globeGroup.add(arcGroup)

    const ambient = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambient)

    const softLight = new THREE.PointLight(0xd5ccff, 0.8, 14)
    softLight.position.set(1.8, 1.2, 2.5)
    scene.add(softLight)

    const warmLight = new THREE.PointLight(0xffc5b4, 0.45, 14)
    warmLight.position.set(2.3, 0.1, 1.6)
    scene.add(warmLight)

    onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      targetRotX = 0.32 + y * 0.25
      targetRotY = -0.58 + x * 0.35
    }

    onResize = () => {
      if (!container.clientWidth || !container.clientHeight) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    loadingStatus.value = 'ready'

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      currentRotX += (targetRotX - currentRotX) * 0.035
      currentRotY += (targetRotY - currentRotY) * 0.035

      const t = performance.now() * 0.001

      globeGroup.rotation.x = currentRotX
      globeGroup.rotation.y = currentRotY + t * 0.04

      if (pointsMesh?.material) {
        pointsMesh.material.opacity = 0.88 + Math.sin(t * 1.6) * 0.05
      }

      renderer.render(scene, camera)
    }

    animate()
    isLoading.value = false
  } catch (err) {
    console.error('[Globe] Setup error:', err)
    loadingStatus.value = `error: ${err.message}`
    isLoading.value = false
  }
}

const cleanupGlobe = () => {
  if (onMouseMove) window.removeEventListener('mousemove', onMouseMove)
  if (onResize) window.removeEventListener('resize', onResize)

  if (animationId) cancelAnimationFrame(animationId)

  disposableGeometries.forEach((g) => g.dispose())
  disposableMaterials.forEach((m) => m.dispose())
  disposableGeometries.length = 0
  disposableMaterials.length = 0

  if (renderer) {
    renderer.dispose()
    const canvas = renderer.domElement
    if (canvas?.parentNode) canvas.parentNode.removeChild(canvas)
  }
}

onMounted(() => {
  setupGlobe()
})

onUnmounted(() => {
  cleanupGlobe()
})
</script>

<style scoped>
:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  border-radius: 1rem;
}

.stripe-bg {
  background:
    radial-gradient(56% 56% at 50% 44%, rgba(255, 255, 255, 0.72), rgba(242, 242, 247, 0) 72%),
    radial-gradient(90% 90% at 50% 55%, rgba(225, 227, 239, 0.78), rgba(242, 242, 247, 0.98) 85%);
}
</style>
