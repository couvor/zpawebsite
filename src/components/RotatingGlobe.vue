<template>
  <div class="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-transparent">
    <div ref="globeContainer" class="w-full h-full"></div>
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
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

let scene, camera, renderer, globe, atmosphere, animationId, cleanup

// Generate procedural Earth texture (no external CDN needed)
const generateEarthTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Create gradient background (ocean)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#1a5f7a')
  gradient.addColorStop(0.5, '#2b8fb5')
  gradient.addColorStop(1, '#1a5f7a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw continents (simplified)
  ctx.fillStyle = '#2d5016'
  
  // North America
  ctx.fillRect(100, 250, 200, 150)
  // South America
  ctx.fillRect(180, 420, 100, 120)
  // Europe
  ctx.fillRect(600, 200, 120, 100)
  // Africa
  ctx.fillRect(700, 350, 120, 180)
  // Asia
  ctx.fillRect(900, 180, 300, 200)
  // Australia
  ctx.fillRect(1200, 500, 80, 80)
  // Antarctica
  ctx.fillRect(0, 900, canvas.width, 124)

  // Add some variation with darker greens
  ctx.fillStyle = '#1f3d0a'
  ctx.fillRect(120, 270, 80, 60)
  ctx.fillRect(920, 220, 150, 100)
  ctx.fillRect(750, 380, 80, 80)

  // Add cloud-like patterns
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const size = Math.random() * 100 + 50
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Generate normal map for bump effect
const generateNormalMap = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512

  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = '#7f7fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add some noise
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 20 - 10
    data[i] += noise     // R
    data[i + 1] += noise // G
  }

  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

const setupGlobe = async () => {
  try {
    const container = globeContainer.value
    if (!container) {
      console.error('[Globe] Container not found')
      loadingStatus.value = 'container not found'
      return
    }

    // Wait for container to have dimensions
    await new Promise(resolve => setTimeout(resolve, 100))

    const width = container.clientWidth
    const height = container.clientHeight

    console.log('[Globe] Container dimensions:', width, 'x', height)

    if (width === 0 || height === 0) {
      console.error('[Globe] Container has no dimensions')
      loadingStatus.value = 'container has no dimensions'
      return
    }

    // Scene setup
    loadingStatus.value = 'creating scene'
    scene = new THREE.Scene()
    scene.background = null
    scene.fog = null

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 2.2

    // Renderer setup
    loadingStatus.value = 'creating renderer'
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    container.appendChild(renderer.domElement)
    console.log('[Globe] Renderer created')

    // Generate textures
    loadingStatus.value = 'generating textures'
    const earthTexture = generateEarthTexture()
    const normalMap = generateNormalMap()

    // Create sphere geometry
    loadingStatus.value = 'creating geometry'
    const geometry = new THREE.SphereGeometry(1, 128, 128)

    // Create material
    loadingStatus.value = 'creating material'
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: normalMap,
      shininess: 15,
      emissive: 0x333333,
      emissiveIntensity: 0.3,
      wireframe: false,
      side: THREE.FrontSide
    })

    globe = new THREE.Mesh(geometry, material)
    scene.add(globe)
    console.log('[Globe] Globe mesh created')

    // Add atmosphere
    loadingStatus.value = 'creating atmosphere'
    const atmosphereGeometry = new THREE.SphereGeometry(1.08, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x5ba3ff) },
        scale: { value: 1.0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color, intensity * 0.4);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side: THREE.BackSide
    })
    atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Lighting
    loadingStatus.value = 'setting up lights'
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5)
    sunLight.position.set(8, 5, 8)
    sunLight.castShadow = false
    scene.add(sunLight)

    const rimLight = new THREE.DirectionalLight(0xadc8e1, 1.0)
    rimLight.position.set(-6, -3, -6)
    scene.add(rimLight)

    const topLight = new THREE.DirectionalLight(0xd4e7ff, 0.6)
    topLight.position.set(0, 10, 0)
    scene.add(topLight)

    console.log('[Globe] Lighting setup complete')

    // Setup interactivity
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = Math.PI * 0.3
    let currentRotY = -Math.PI * 0.6

    const onMouseMove = (e) => {
      targetRotX = (e.clientY / window.innerHeight - 0.5) * Math.PI * 0.4
      targetRotY = (e.clientX / window.innerWidth - 0.5) * Math.PI * 0.8
    }

    const onResize = () => {
      if (!container || !container.clientWidth) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    // Animation loop
    loadingStatus.value = 'ready'

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth rotation following mouse
      currentRotX += (targetRotX - currentRotX) * 0.08
      currentRotY += (targetRotY - currentRotY) * 0.08

      // Auto-rotation
      globe.rotation.x = currentRotX
      globe.rotation.y = currentRotY + Date.now() * 0.0004

      if (atmosphere) {
        atmosphere.rotation.copy(globe.rotation)
      }

      renderer.render(scene, camera)
    }

    animate()
    isLoading.value = false

    console.log('[Globe] Setup complete!')

    // Cleanup function
    cleanup = () => {
      console.log('[Globe] Cleanup')
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (animationId) cancelAnimationFrame(animationId)
      if (renderer && container && container.contains(renderer.domElement)) {
        geometry.dispose()
        material.dispose()
        atmosphereMaterial.dispose()
        renderer.dispose()
        container.removeChild(renderer.domElement)
      }
    }

  } catch (err) {
    console.error('[Globe] Setup error:', err)
    loadingStatus.value = 'error: ' + err.message
    isLoading.value = false
  }
}

onMounted(() => {
  setupGlobe()
})

onUnmounted(() => {
  if (cleanup) {
    cleanup()
  }
})
</script>

<style scoped>
:deep(.globe-container) {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
}

:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  border-radius: 1rem;
}
</style>
</script>

<style scoped>
:deep(.globe-container) {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
}

:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  border-radius: 1rem;
}
</style>
