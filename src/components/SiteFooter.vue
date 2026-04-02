<template>
  <footer class="border-t border-white/80 bg-white/70 py-10 backdrop-blur-sm">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 text-sm text-slateSoft md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <p class="font-semibold text-ink">© {{ year }} 张明旸保护协会</p>
        <p class="mt-1 text-xs">我们托起千千万万个梦想</p>
      </div>
      <p class="text-xs tracking-wide">Built with Vue3 · Tailwind · Motion · Vercel</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
