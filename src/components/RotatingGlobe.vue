<template>
  <div class="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-transparent">
    <div ref="globeContainer" class="w-full h-full"></div>
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl z-10">
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

let scene, camera, renderer, globe, animationId

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
    scene.background = new THREE.Color(0x000000)

    // Camera setup
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000)
    camera.position.z = 2.5

    // Renderer setup
    loadingStatus.value = 'creating renderer'
    renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Load Earth texture from CDN
    loadingStatus.value = 'loading Earth texture'
    const textureLoader = new THREE.TextureLoader()
    
    let earthTexture
    try {
      earthTexture = await new Promise((resolve, reject) => {
        textureLoader.load(
          'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
          resolve,
          undefined,
          reject
        )
      })
    } catch (err) {
      console.warn('Primary texture failed, trying backup')
      earthTexture = await new Promise((resolve, reject) => {
        textureLoader.load(
          'https://images-assets.nasa.gov/image/as17-148-22727/as17-148-22727~large.jpg',
          resolve,
          undefined,
          reject
        )
      })
    }

    // Load normal map for bump effect
    loadingStatus.value = 'loading normal map'
    let normalMap
    try {
      normalMap = await new Promise((resolve) => {
        textureLoader.load(
          'https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.jpg',
          resolve,
          undefined,
          () => resolve(null)
        )
      })
    } catch (err) {
      normalMap = null
    }

    // Create sphere geometry
    loadingStatus.value = 'creating geometry'
    const geometry = new THREE.SphereGeometry(1, 256, 256)

    // Create material
    loadingStatus.value = 'creating material'
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalMap: normalMap,
      shininess: 10,
      emissive: 0x333333,
      emissiveIntensity: 0.2
    })

    globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    // Add lighting
    loadingStatus.value = 'setting up lights'
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // Setup interactivity
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0.3
    let currentRotY = -1.8

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      targetRotX = y * Math.PI * 0.3
      targetRotY = x * Math.PI * 0.5
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

      // Smooth rotation
      currentRotX += (targetRotX - currentRotX) * 0.05
      currentRotY += (targetRotY - currentRotY) * 0.05

      // Auto-rotation
      globe.rotation.x = currentRotX
      globe.rotation.y = currentRotY + Date.now() * 0.00005

      renderer.render(scene, camera)
    }

    animate()
    isLoading.value = false

    console.log('[Globe] Setup complete!')

    // Store cleanup
    const cleanup = () => {
      console.log('[Globe] Cleanup')
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (animationId) cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }

    if (container) {
      container._cleanup = cleanup
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
  if (globeContainer.value && globeContainer.value._cleanup) {
    globeContainer.value._cleanup()
  }
})
</script>

<style scoped>
:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  border-radius: 1rem;
}
</style>
