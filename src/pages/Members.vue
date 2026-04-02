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
  { name: '张明旸', role: '首席科学家', desc: '负责协会科研与前沿科技探索' },
  { name: '羿德钰', role: '副会长', desc: '协调线下活动与协会网络技术支持。' },
  { name: '尹梓旭', role: '执行会长', desc: '负责协会日常运营与战略规划。' },
  { name: '汪桠然', role: '副会长', desc: '维护成员沟通氛围，关注反馈与心理支持。' },
  { name: '欧阳兆秦', role: '浙江大学支部部长', desc: '负责前沿科技探索，并管理协会驻浙江业务' },
  { name: '谈宇森', role: '西安理工大学支部部长/驻朝鲜办事处主任;', desc: '负责官网迭代、数据归档与线上协作工具。' }
]
</script>
