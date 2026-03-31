<template>
  <div class="min-h-screen bg-gradient-to-b from-primaryBg/70 via-white to-mist">
    <SiteHeader />
    <main class="mx-auto w-full max-w-6xl px-5 pb-16 pt-10 md:px-8">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
