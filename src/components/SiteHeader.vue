<template>
  <header class="sticky top-0 z-40 border-b border-white/70 bg-white/75 backdrop-blur-xl">
    <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
      <RouterLink to="/" class="group flex items-center gap-3">
        <img src="/logos/logo.jpg" alt="ZPA Logo" class="h-10 w-10 rounded-xl object-cover shadow-soft" />
        <div>
          <p class="text-sm font-semibold tracking-wide text-primary">张明旸保护协会</p>
          <p class="text-xs text-slateSoft">Protect with warmth</p>
        </div>
      </RouterLink>

      <ul class="hidden items-center gap-1 rounded-xl border border-white/80 bg-white/85 p-1 text-sm md:flex">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="inline-flex rounded-lg px-3 py-2 transition"
            :class="isActive(item.to) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <RouterLink to="/contact" class="stripe-btn hidden md:inline-flex">加入我们</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: '首页', to: '/' },
  { label: '协会介绍', to: '/about' },
  { label: '成员', to: '/members' },
  { label: '活动', to: '/activities' },
  { label: '合作', to: '/partners' },
  { label: '联系', to: '/contact' }
]

const isActive = (path) => route.path === path
</script>
