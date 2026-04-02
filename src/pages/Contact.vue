<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="glass-card space-y-4 p-8 md:p-12">
        <p class="text-sm font-semibold tracking-[0.18em] text-primary">CONTACT</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">联系我们</h1>
        <p class="text-zinc-600">欢迎加入、合作或提供建议。每一条信息我们都会认真回复。</p>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.12">
      <div class="grid gap-5 md:grid-cols-2">
        <article class="glass-card space-y-4 p-7">
          <h2 class="text-2xl font-bold">联系方式</h2>
          <ul class="space-y-3 text-zinc-600">
            <li><span class="font-semibold text-textDeep">邮箱：</span>head@couvor.cyou</li>
            <li><span class="font-semibold text-textDeep">企业微信：张明旸保护协会</span></li>
          </ul>

          <div class="flex gap-3 pt-2">
            <a v-for="social in socials" :key="social.label" href="#" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-glow">
              <Icon :icon="social.icon" width="20" />
            </a>
          </div>
        </article>

        <article class="glass-card p-7">
          <h2 class="text-2xl font-bold">微信二维码</h2>
          <div class="mt-4 flex h-64 items-center justify-center rounded-3xl border border-primary/20 bg-white">
            <img src="/qrcodes/wechat-qr.svg" alt="微信二维码" class="h-56 w-56 rounded-lg" />
          </div>
        </article>
      </div>
    </RevealBlock>
  </section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import RevealBlock from '../components/RevealBlock.vue'

const socials = [
  { label: '微博', icon: 'weibo.com' },
  { label: '微信公众号', icon: 'wechat.com' },
  { label: 'B站', icon: 'bilibili.com' }
]
</script>
