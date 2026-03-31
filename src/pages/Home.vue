<template>
  <section class="space-y-20">
    <RevealBlock>
      <div class="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-10 shadow-card md:p-16">
        <div class="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/25 blur-3xl"></div>
        <div class="absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-highlight/30 blur-3xl"></div>

        <div class="relative max-w-3xl space-y-6">
          <p class="text-sm font-semibold tracking-[0.18em] text-primary">张明旸保护协会 · 官方网站</p>
          <h1 class="text-4xl font-extrabold leading-tight text-textDeep md:text-6xl">
            世界规模最大的
            <span class="text-primary">张明旸保护组织</span>
          </h1>
          <p class="max-w-2xl text-lg leading-relaxed text-zinc-600">
            我们连接关注者、志愿者与行动者，持续记录、倡导、共创支持网络，让每一次发声都更有力量。
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/activities" class="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-glow transition hover:-translate-y-0.5">查看最新活动</RouterLink>
            <RouterLink to="/about" class="rounded-2xl border border-primary/30 bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary/10">了解协会理念</RouterLink>
          </div>
        </div>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.1">
      <div class="grid gap-4 md:grid-cols-4">
        <article v-for="point in reasons" :key="point.title" class="glass-card p-6">
          <p class="mb-3 text-sm font-semibold tracking-widest text-primary">WHY</p>
          <h3 class="text-xl font-bold">{{ point.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-zinc-600">{{ point.text }}</p>
        </article>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.2">
      <div class="space-y-6">
        <h2 class="text-3xl font-bold md:text-4xl">协会理念</h2>
        <div class="grid gap-5 md:grid-cols-3">
          <div v-for="idea in ideas" :key="idea.title" class="glass-card p-7 transition hover:-translate-y-1 hover:shadow-glow">
            <h3 class="text-xl font-semibold">{{ idea.title }}</h3>
            <p class="mt-3 text-zinc-600">{{ idea.text }}</p>
          </div>
        </div>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.3">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold">最新活动预览</h2>
          <RouterLink to="/activities" class="text-sm font-semibold text-primary">查看全部 →</RouterLink>
        </div>
        <div class="grid gap-5 md:grid-cols-3">
          <article v-for="event in events" :key="event.title" class="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-glow">
            <div class="h-40 bg-gradient-to-br from-primary/70 via-primaryLight/50 to-highlight/40"></div>
            <div class="space-y-2 p-6">
              <p class="text-xs tracking-wider text-zinc-500">{{ event.date }}</p>
              <h3 class="text-lg font-bold">{{ event.title }}</h3>
              <p class="text-sm text-zinc-600">{{ event.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </RevealBlock>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'

const reasons = [
  { title: '公开透明', text: '关注信息公开与进度更新，建立可信、可追踪的行动档案。' },
  { title: '温和倡议', text: '坚持理性表达，以共识构建推动更广泛的社会关注。' },
  { title: '社群协作', text: '组织志愿团队，分工完成传播、记录、支持和反馈。' },
  { title: '长期守护', text: '不做一次性热度，持续迭代行动机制与资源连接。' }
]

const ideas = [
  { title: '尊重事实', text: '所有传播建立在可核实信息之上，避免情绪化失真。' },
  { title: '彼此照亮', text: '让关注者互相支持，形成有温度的协作网络。' },
  { title: '持续行动', text: '把每次发声沉淀为可复用的行动模板与经验。' }
]

const events = [
  { date: '2026.03', title: '春季倡议周', desc: '线上线下联动传播，提升公众对议题的基础认知。' },
  { date: '2026.02', title: '志愿者工作坊', desc: '围绕叙事表达与公共沟通，进行结构化训练。' },
  { date: '2026.01', title: '守护者圆桌', desc: '邀请成员讨论年度行动重点与资源协同方式。' }
]
</script>
