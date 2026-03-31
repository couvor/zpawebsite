<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="glass-card space-y-4 p-8 md:p-12">
        <p class="text-sm font-semibold tracking-[0.18em] text-primary">ACTIVITIES</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">活动展示</h1>
        <p class="text-zinc-600">从倡议到复盘，我们让每次行动都留下清晰足迹。</p>
      </div>
    </RevealBlock>

    <div class="grid gap-6 md:grid-cols-2">
      <RevealBlock v-for="(activity, idx) in activities" :key="activity.title" :delay="idx * 0.08">
        <article class="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-glow">
          <div class="relative h-52 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/80 via-primaryLight/55 to-highlight/50"></div>
            <div class="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-primary">{{ activity.date }}</div>
          </div>
          <div class="space-y-3 p-6">
            <h3 class="text-2xl font-bold">{{ activity.title }}</h3>
            <p class="text-sm leading-relaxed text-zinc-600">{{ activity.desc }}</p>
          </div>
        </article>
      </RevealBlock>
    </div>
  </section>
</template>

<script setup>
import RevealBlock from '../components/RevealBlock.vue'

const activities = [
  {
    date: '2026.03.21',
    title: '守护倡议快闪展',
    desc: '在城市公共空间展出“守护故事墙”，收集超过 600 条公众留言，形成线上数字档案。'
  },
  {
    date: '2026.03.08',
    title: '暖橙夜谈',
    desc: '邀请研究者、媒体人与社群成员进行开放式对谈，聚焦“理性表达与长期行动”。'
  },
  {
    date: '2026.02.15',
    title: '青年志愿训练营',
    desc: '开展三场工作坊，覆盖公共写作、视觉传播和项目协作，培养新一批核心志愿者。'
  },
  {
    date: '2026.01.12',
    title: '年度守护报告发布',
    desc: '发布年度工作报告，公开协作机制、活动成果与下一阶段目标，持续推进透明化。'
  }
]
</script>
