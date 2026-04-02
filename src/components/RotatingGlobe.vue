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
import Gio from 'giojs'

const globeContainer = ref(null)
const isLoading = ref(true)
const loadingStatus = ref('initializing')

let globe = null
let animationId = null
let cleanup = null

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

    // Initialize Gio globe
    loadingStatus.value = 'initializing Gio globe'
    globe = new Gio.Controller({
      container: container,
      enableStats: false
    })

    // Configure globe appearance
    loadingStatus.value = 'configuring globe'
    
    // Set initial position to show China
    globe.setStyle({
      brightness: 0.5
    })

    // Set meridians and parallels
    globe.configure({
      cameraAutoOrbit: false,
      lightIntensity: 1.2,
      lightColor: 0xffffff,
      ambientLight: 0x8899aa,
      ambientLightIntensity: 1.1
    })

    // Configure initial view
    globe.setInitialScale({
      scaleFactor: 1.2,
      initLatitude: 30,     // Position to show China
      initLongitude: 100
    })

    // Setup mouse controls
    loadingStatus.value = 'setting up controls'
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0.5
    let currentRotY = -1.8

    const onMouseMove = (e) => {
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.5
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 1.0
    }

    const onResize = () => {
      if (!container || !container.clientWidth) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (globe && globe.canvases && globe.canvases.webGLCanvas) {
        globe.canvases.webGLCanvas.width = w
        globe.canvases.webGLCanvas.height = h
      }
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
      if (globe && globe.scene) {
        const autoRotateSpeed = 0.0004
        const baseRotation = currentRotY + Date.now() * autoRotateSpeed
        
        globe.scene.rotation.x = currentRotX
        globe.scene.rotation.y = baseRotation
      }
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
      if (globe) {
        globe.destroy()
      }
    }

  } catch (err) {
    console.error('[Globe] Setup error:', err)
    loadingStatus.value = 'error: ' + err.message
    isLoading.value = false
  }
}

onMounted(() => {
  // Ensure DOM is ready
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
