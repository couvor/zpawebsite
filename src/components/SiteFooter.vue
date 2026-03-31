<template>
  <footer class="border-t border-white/70 bg-white/70 py-8 backdrop-blur-sm">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-8">
      <p>© {{ year }} 张明旸保护协会. 柔和行动，坚定守护。</p>
      <p class="text-xs tracking-wide text-zinc-400">Built with Vue3 · Tailwind · Motion · Vercel</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
