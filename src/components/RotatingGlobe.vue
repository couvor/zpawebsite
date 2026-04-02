<template>
  <div class="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#05060a]">
    <div class="absolute inset-0 globe-bg"></div>
    <div class="absolute inset-0">
      <div class="halo-ring"></div>
    </div>

    <div ref="globeContainer" class="relative z-10 w-full h-full"></div>

    <div v-if="isLoading" class="absolute inset-0 z-20 flex items-center justify-center bg-black/20 rounded-2xl">
      <div class="text-white text-center">
        <div class="mb-2 text-sm">loading globe...</div>
        <div class="text-xs text-gray-300">{{ loadingStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'

const globeContainer = ref(null)
const isLoading = ref(true)
const loadingStatus = ref('initializing')

let scene
let camera
let renderer
let animationId

let globeGroup
let coreMesh
let wireMesh
let pointsMesh
let outerGlowMesh
let stars

let onMouseMove
let onResize

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

    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.z = 3.2

    loadingStatus.value = 'creating renderer'
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    loadingStatus.value = 'building globe'

    globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const globeGeometry = new THREE.SphereGeometry(1, 96, 96)

    coreMesh = new THREE.Mesh(
      globeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x101725,
        transparent: true,
        opacity: 0.7
      })
    )
    globeGroup.add(coreMesh)

    wireMesh = new THREE.Mesh(
      globeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x8fb6ff,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      })
    )
    globeGroup.add(wireMesh)

    pointsMesh = new THREE.Points(
      globeGeometry,
      new THREE.PointsMaterial({
        color: 0xdbe8ff,
        size: 0.012,
        transparent: true,
        opacity: 0.9,
        depthWrite: false
      })
    )
    globeGroup.add(pointsMesh)

    outerGlowMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 96, 96),
      new THREE.MeshBasicMaterial({
        color: 0x7ea7ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    )
    globeGroup.add(outerGlowMesh)

    const starsGeometry = new THREE.BufferGeometry()
    const starCount = 1300
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 8 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[i + 1] = radius * Math.cos(phi)
      starPositions[i + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))

    stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        color: 0x8ea3d8,
        size: 0.015,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
      })
    )
    scene.add(stars)

    const ambientLight = new THREE.AmbientLight(0xb7cbff, 0.75)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(0xa7c0ff, 1.8, 18)
    keyLight.position.set(2.6, 1.4, 3.2)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0x6f8fff, 0.9, 16)
    rimLight.position.set(-3.4, -1.6, -2.3)
    scene.add(rimLight)

    let targetRotX = 0.12
    let targetRotY = -0.35
    let currentRotX = 0.12
    let currentRotY = -0.35

    onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      targetRotX = y * 0.55
      targetRotY = x * 0.9
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

      currentRotX += (targetRotX - currentRotX) * 0.04
      currentRotY += (targetRotY - currentRotY) * 0.04

      const t = performance.now() * 0.001

      globeGroup.rotation.x = currentRotX
      globeGroup.rotation.y = currentRotY + t * 0.12

      outerGlowMesh.rotation.y -= 0.0006
      stars.rotation.y += 0.00012

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

  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()

      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose())
        } else {
          obj.material.dispose()
        }
      }
    })
  }

  if (renderer) {
    renderer.dispose()
    const canvas = renderer.domElement
    if (canvas?.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
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

.globe-bg {
  background:
    radial-gradient(42% 42% at 50% 48%, rgba(120, 152, 235, 0.18), rgba(5, 6, 10, 0) 74%),
    radial-gradient(85% 72% at 50% 50%, rgba(9, 12, 20, 0.75), rgba(5, 6, 10, 1) 100%);
}

.halo-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(72vw, 510px);
  height: min(72vw, 510px);
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  border: 1px solid rgba(155, 183, 255, 0.18);
  box-shadow:
    0 0 120px rgba(114, 145, 240, 0.12),
    inset 0 0 90px rgba(145, 170, 255, 0.05);
  animation: haloPulse 6.8s ease-in-out infinite;
}

@keyframes haloPulse {
  0%,
  100% {
    opacity: 0.52;
    transform: translate(-50%, -50%) scale(0.985);
  }
  50% {
    opacity: 0.85;
    transform: translate(-50%, -50%) scale(1.02);
  }
}
</style>
