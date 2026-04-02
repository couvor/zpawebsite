<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="glass-card space-y-5 p-8 md:p-12">
        <p class="text-sm font-semibold tracking-[0.18em] text-primary">ABOUT ASSOCIATION</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">协会介绍</h1>
        <p class="max-w-3xl text-lg leading-relaxed text-zinc-600">
          让"附近"回归，保护喜欢无所事事的人，保护喜欢在四书馆读无用之书的人，保护用理想对抗现实的人，想后退想逃避，可以，ZPA在你身后。
        </p>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.12">
      <div class="grid gap-5 md:grid-cols-3">
        <article v-for="item in blocks" :key="item.title" class="glass-card p-7 transition hover:-translate-y-1 hover:shadow-glow">
          <h2 class="text-2xl font-bold">{{ item.title }}</h2>
          <p class="mt-4 leading-relaxed text-zinc-600">{{ item.text }}</p>
        </article>
      </div>
    </RevealBlock>
  </section>
</template>

<script setup>
import RevealBlock from '../components/RevealBlock.vue'

const blocks = [
  {
    title: '成立背景',
    text: '我们面对着未知数最多的时代，理想难以实现社交近乎没有，没有人愿意走进自己的心，自己也难以与亲近的人交流，社交媒体上的表情包热框数炸着大脑，自己难以走进自己的内心，他人也以走进，"附近"正在消失。我们试图让"无声"的人发声，让"附近"回归'
  },
  {
    title: '协会愿景',
    text: '构建一个长期、稳定、透明的守护网络，让每一位愿意发声的人都能找到位置与支持。'
  },
  {
    title: '核心价值观',
    text: '只倾听，不批判；只建议，不要求，只充实，不忙碌；只生活，不绝望。'
  }
]
</script>
