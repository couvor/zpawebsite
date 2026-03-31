<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="glass-card space-y-5 p-8 md:p-12">
        <p class="text-sm font-semibold tracking-[0.18em] text-primary">ABOUT ASSOCIATION</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">协会介绍</h1>
        <p class="max-w-3xl text-lg leading-relaxed text-zinc-600">
          张明旸保护协会成立于一群长期关注公共议题的志愿者。我们相信，真正有效的守护，来自持续的信息整理、共情沟通与联合行动。
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
    text: '在信息碎片化背景下，许多支持声音难以被系统记录。协会希望以更有序的方式连接关注者，降低行动门槛。'
  },
  {
    title: '协会愿景',
    text: '构建一个长期、稳定、透明的守护网络，让每一位愿意发声的人都能找到位置与支持。'
  },
  {
    title: '核心价值观',
    text: '真实、理性、协作。我们既保持立场，也保持对事实与不同观点的尊重。'
  }
]
</script>
