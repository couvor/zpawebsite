<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="stripe-panel space-y-5 p-8 md:p-12">
        <p class="stripe-kicker">About Association</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">协会介绍</h1>
        <p class="max-w-3xl text-lg leading-relaxed text-slateSoft">
          让附近回归，保护喜欢无所事事的人，保护喜欢在图书馆读无用之书的人，保护用理想对抗现实的人。想后退想逃避，可以，ZPA 在你身后。
        </p>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.12">
      <div class="grid gap-5 md:grid-cols-3">
        <article v-for="item in blocks" :key="item.title" class="stripe-soft p-7">
          <h2 class="text-2xl font-bold">{{ item.title }}</h2>
          <p class="mt-4 leading-relaxed text-slateSoft">{{ item.text }}</p>
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
    text: '我们面对着未知数最多的时代。理想难以实现，社交近乎消失，人们难以走进自己与他人的内心。我们试图让无声的人发声，让附近回归。'
  },
  {
    title: '协会愿景',
    text: '构建一个长期、稳定、透明的守护网络，让每一位愿意发声的人都能找到位置与支持。'
  },
  {
    title: 'ZPA价值观',
    text: '只倾听，不批判；只建议，不要求；只充实，不忙碌；只生活，不绝望。'
  }
]
</script>
