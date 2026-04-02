<template>
  <header class="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl">
    <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
      <RouterLink to="/" class="group flex items-center gap-3">
        <img src="/logos/logo.jpg" alt="ZPA Logo" class="h-10 w-10 rounded-xl object-cover shadow-soft" />
        <div>
          <p class="text-sm font-semibold tracking-wide text-primary">张明旸保护协会</p>
          <p class="text-xs text-slateSoft">Protect with warmth</p>
        </div>
      </RouterLink>

      <ul class="hidden items-center gap-1 rounded-xl border border-white/80 bg-white/90 p-1 text-sm md:flex">
        <li v-for="item in navItems" :key="item.label" class="relative group">
          <template v-if="item.children">
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-lg px-3 py-2 transition"
              :class="isGroupActive(item) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
            >
              {{ item.label }}
              <span class="text-[10px]">▼</span>
            </button>

            <div class="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
              <div class="min-w-[180px] rounded-xl border border-white/80 bg-white/95 p-1 shadow-card backdrop-blur-md">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  class="block rounded-lg px-3 py-2 text-sm transition"
                  :class="isActive(child.to) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
                >
                  {{ child.label }}
                </RouterLink>
              </div>
            </div>
          </template>

          <RouterLink
            v-else
            :to="item.to"
            class="inline-flex rounded-lg px-3 py-2 transition"
            :class="isActive(item.to) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <RouterLink to="/contact" class="stripe-btn hidden md:inline-flex">加入我们</RouterLink>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 text-primary md:hidden"
          @click="mobileOpen = !mobileOpen"
        >
          ☰
        </button>
      </div>
    </nav>

    <div v-if="mobileOpen" class="border-t border-white/80 bg-white/95 px-5 py-3 md:hidden">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="`mobile-${item.label}`" class="rounded-lg">
          <template v-if="item.children">
            <p class="px-3 py-2 text-sm font-semibold text-ink">{{ item.label }}</p>
            <div class="space-y-1 pb-1 pl-2">
              <RouterLink
                v-for="child in item.children"
                :key="`m-${child.to}`"
                :to="child.to"
                class="block rounded-lg px-3 py-2 text-sm transition"
                :class="isActive(child.to) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
                @click="mobileOpen = false"
              >
                {{ child.label }}
              </RouterLink>
            </div>
          </template>

          <RouterLink
            v-else
            :to="item.to"
            class="block rounded-lg px-3 py-2 text-sm transition"
            :class="isActive(item.to) ? 'bg-primary/12 text-primary' : 'text-slateSoft hover:bg-primary/10 hover:text-primary'"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)

const navItems = [
  { label: '首页', to: '/' },
  {
    label: '协会介绍',
    children: [
      { label: '协会理念', to: '/about' },
      { label: '核心成员', to: '/members' }
    ]
  },
  {
    label: '动态资讯',
    children: [
      { label: '最新活动', to: '/activities' },
      { label: '合作伙伴', to: '/partners' }
    ]
  },
  { label: '联系我们', to: '/contact' }
]

const isActive = (path) => route.path === path
const isGroupActive = (item) => item.children?.some((child) => route.path === child.to)
</script>
