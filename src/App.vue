<template>
  <div class="stripe-shell min-h-screen">
    <SiteHeader />
    <main class="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 md:px-8">
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
