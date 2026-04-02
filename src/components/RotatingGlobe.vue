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
    scene.background = null  // 透明背景
    scene.fog = null  // 移除雾以保留亮度

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
    renderer.setClearColor(0x000000, 0)  // 透明背景
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    
    container.appendChild(renderer.domElement)
    console.log('[Globe] Renderer created')

    // Load textures - with detailed logging
    loadingStatus.value = 'loading Earth texture'
    console.log('[Globe] Loading Earth texture from CDN')
    
    const textureLoader = new THREE.TextureLoader()
    
    let earthTexture = null
    let bumpTexture = null

    try {
      earthTexture = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Texture load timeout')), 30000)
        
        textureLoader.load(
          'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg',
          (texture) => {
            clearTimeout(timeout)
            texture.colorSpace = THREE.SRGBColorSpace
            console.log('[Globe] Earth texture loaded successfully')
            resolve(texture)
          },
          (progress) => {
            console.log('[Globe] Earth texture loading:', Math.round(progress.loaded / progress.total * 100) + '%')
          },
          (err) => {
            clearTimeout(timeout)
            console.warn('[Globe] Earth texture load failed:', err)
            reject(err)
          }
        )
      })
    } catch (err) {
      console.warn('[Globe] Using fallback - Earth texture failed:', err.message)
      earthTexture = null
    }

    loadingStatus.value = 'loading bump map'
    try {
      bumpTexture = await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(null), 15000)
        textureLoader.load(
          'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png',
          (texture) => {
            clearTimeout(timeout)
            console.log('[Globe] Bump texture loaded')
            resolve(texture)
          },
          undefined,
          (err) => {
            clearTimeout(timeout)
            console.warn('[Globe] Bump texture load failed:', err)
            resolve(null)
          }
        )
      })
    } catch (err) {
      bumpTexture = null
    }

    // Create sphere geometry with high resolution
    loadingStatus.value = 'creating geometry'
    const geometry = new THREE.SphereGeometry(1, 128, 128)

    // Create material
    loadingStatus.value = 'creating material'
    let material
    
    if (earthTexture) {
      console.log('[Globe] Creating material with Earth texture')
      material = new THREE.MeshPhongMaterial({
        map: earthTexture,
        bumpMap: bumpTexture || undefined,
        bumpScale: bumpTexture ? 0.08 : 0,
        shininess: 15,
        emissive: 0x333333,
        emissiveIntensity: 0.3,
        wireframe: false,
        side: THREE.FrontSide
      })
    } else {
      console.log('[Globe] Creating fallback material (no texture)')
      material = new THREE.MeshPhongMaterial({
        color: 0x2694e8,
        emissive: 0x112244,
        shininess: 2,
        wireframe: false
      })
    }

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
    // 初始位置指向中国，并显示北半球
    let currentRotX = Math.PI * 0.3  // 向下倾斜以显示北半球
    let currentRotY = -Math.PI * 0.6  // 指向中国

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
    let frameCount = 0

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      frameCount++

      // Smooth rotation following mouse
      currentRotX += (targetRotX - currentRotX) * 0.08
      currentRotY += (targetRotY - currentRotY) * 0.08

      // Auto-rotation - faster speed
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
