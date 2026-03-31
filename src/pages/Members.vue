<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="glass-card space-y-4 p-8 md:p-12">
        <p class="text-sm font-semibold tracking-[0.18em] text-primary">MEMBERS</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">成员介绍</h1>
        <p class="text-zinc-600">每位成员都在自己的位置上贡献行动力：记录、传播、组织、支持。</p>
      </div>
    </RevealBlock>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(member, index) in members"
        :key="member.name"
        :initial="{ opacity: 0, y: 28 }"
        :in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.65, delay: index * 0.08, easing: [0.22, 1, 0.36, 1] }"
        class="glass-card overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow"
      >
        <div class="mb-5 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-highlight p-[2px]">
          <div class="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-bold text-primary">
            {{ member.name.slice(0, 1) }}
          </div>
        </div>
        <h3 class="text-xl font-bold">{{ member.name }}</h3>
        <p class="mt-1 text-sm text-primary">{{ member.role }}</p>
        <p class="mt-4 text-sm leading-relaxed text-zinc-600">{{ member.desc }}</p>
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from '@motionone/vue'
import RevealBlock from '../components/RevealBlock.vue'

const members = [
  { name: '尹梓旭', role: '张明旸保护协会创始人，会长', desc: '负责整体方向与公共叙事框架设计。' },
  { name: '羿德钰', role: '张明旸保护协会副会长', desc: '协调线下活动与志愿者排班执行。' },
  { name: '汪桠然', role: '张明旸保护协会副会长', desc: '完成事实核验、长文整理与发布节奏管理。' },
  { name: '张明旸', role: '协会首席科学家', desc: '负责协会科研工作与技术指导。' },
  { name: '唐沐', role: '视觉设计', desc: '提供品牌视觉、活动海报与网站内容包装。' },
  { name: '高岚', role: '技术志愿者', desc: '负责官网迭代、数据归档与线上协作工具。' }
]
</script>
