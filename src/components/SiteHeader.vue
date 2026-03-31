<template>
  <header class="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl">
    <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
      <RouterLink to="/" class="group flex items-center gap-3">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-glow transition group-hover:-translate-y-0.5">张</span>
        <div>
          <p class="text-sm font-semibold tracking-wide text-primary">张明旸保护协会</p>
          <p class="text-xs text-zinc-500">Protect with warmth</p>
        </div>
      </RouterLink>

      <ul class="flex items-center gap-1 rounded-2xl border border-zinc-100 bg-white/80 p-1 text-sm md:gap-2">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="inline-flex rounded-xl px-3 py-2 transition"
            :class="isActive(item.to) ? 'bg-primary/10 text-primary' : 'text-zinc-600 hover:bg-primary/10 hover:text-primary'"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
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
  { label: '联系', to: '/contact' }
]

const isActive = (path) => route.path === path
</script>
