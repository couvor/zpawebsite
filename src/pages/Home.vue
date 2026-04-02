<template>
  <section class="space-y-16">
    <RevealBlock>
      <div class="zmy-hero relative overflow-hidden rounded-[2.2rem] border border-white/75 p-10 shadow-card md:p-14">
        <div class="zmy-grid-glow"></div>
        <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/12 blur-3xl"></div>
        <div class="absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-highlight/25 blur-3xl"></div>

        <div class="relative grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div class="space-y-6">
            <p class="stripe-kicker">ZMYBH STYLE · HOMEPAGE</p>
            <h1 class="text-4xl font-extrabold leading-[1.08] md:text-6xl">
              张明旸保护协会
              <span class="block text-primary">连接每个愿意行动的人</span>
            </h1>
            <p class="max-w-2xl text-lg leading-relaxed text-slateSoft">
              从教育到生态，从社区协作到行动倡议，我们将每一次微小参与变成长期改变的力量。
            </p>

            <div class="flex flex-wrap gap-3">
              <RouterLink to="/activities" class="stripe-btn">查看最新活动</RouterLink>
              <RouterLink to="/about" class="stripe-btn-light">了解协会理念</RouterLink>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <article v-for="stat in stats" :key="stat.label" class="zmy-stat-card">
              <p class="text-xs tracking-[0.18em] text-slateSoft">{{ stat.label }}</p>
              <p class="mt-2 text-3xl font-extrabold text-ink">{{ stat.value }}</p>
              <p class="mt-1 text-sm text-slateSoft">{{ stat.desc }}</p>
            </article>
          </div>
        </div>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.08">
      <div class="grid gap-4 md:grid-cols-4">
        <article v-for="point in reasons" :key="point.title" class="stripe-soft p-6">
          <p class="stripe-kicker mb-2">WHY</p>
          <h3 class="text-xl font-bold">{{ point.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slateSoft">{{ point.text }}</p>
        </article>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.14">
      <div class="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
        <div class="stripe-panel p-8 md:p-10">
          <h2 class="text-3xl font-bold md:text-4xl">协会理念</h2>
          <p class="mt-4 text-slateSoft">
            我们相信，真正的守护来自长期主义。以公开透明的行动、温和理性的倡议和跨地区协作机制，构建可持续的社会影响力。
          </p>

          <div class="mt-7 grid gap-4 sm:grid-cols-2">
            <article v-for="idea in ideas" :key="idea.title" class="rounded-2xl border border-white/70 bg-white/70 p-5">
              <h3 class="text-lg font-semibold">{{ idea.title }}</h3>
              <p class="mt-2 text-sm text-slateSoft">{{ idea.text }}</p>
            </article>
          </div>
        </div>

        <aside class="stripe-soft p-7 md:p-8">
          <p class="stripe-kicker">NAV</p>
          <h3 class="mt-3 text-2xl font-bold">快速入口</h3>
          <ul class="mt-5 space-y-3">
            <li v-for="quick in quickLinks" :key="quick.to">
              <RouterLink :to="quick.to" class="zmy-quick-link">
                <span>{{ quick.label }}</span>
                <span aria-hidden="true">→</span>
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.2">
      <div class="space-y-5">
        <h2 class="text-center text-3xl font-bold md:text-4xl">力量汇聚 · 全球连结</h2>
        <RotatingGlobe />
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.3">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl font-bold">最新活动预览</h2>
          <RouterLink to="/activities" class="stripe-link">查看全部</RouterLink>
        </div>
        <div class="grid gap-5 md:grid-cols-3">
          <article v-for="event in events" :key="event.title" class="stripe-soft overflow-hidden">
            <div class="h-36 bg-gradient-to-br from-primary/70 via-primaryLight/55 to-highlight/45"></div>
            <div class="space-y-2 p-6">
              <p class="text-xs tracking-wider text-slateSoft">{{ event.date }}</p>
              <h3 class="text-lg font-bold">{{ event.title }}</h3>
              <p class="text-sm text-slateSoft">{{ event.desc }}</p>
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
import RotatingGlobe from '../components/RotatingGlobe.vue'

const stats = [
  { label: '覆盖城市', value: '100+', desc: '持续开展守护行动' },
  { label: '合作组织', value: '260+', desc: '共建跨域公益协作' },
  { label: '志愿成员', value: '12K+', desc: '线上线下共同参与' }
]

const reasons = [
  { title: '公开透明', text: '关注信息公开与进度更新，建立可信、可追踪的行动档案。' },
  { title: '温和倡议', text: '坚持理性表达，以共识构建推动更广泛的社会关注。' },
  { title: '社群协作', text: '组团队，分工完成传播、记录、支持和反馈。' },
  { title: '长期守护', text: '不做一次性热度，持续迭代行动机制与资源连接。' }
]

const ideas = [
  { title: '环境责任', text: '善待地球就是善待生活在地球上的人，特别是深受环境风险影响的群体。' },
  { title: '教育发展', text: '推动更多校内外学习机会，让每个人都有可能发挥潜能。' },
  { title: '创新创造', text: '以高标准推动组织实践，支持供应链与社区共创长期价值。' },
  { title: '国际协作', text: '联合全球伙伴，围绕共同议题建立持续、可靠的行动网络。' }
]

const quickLinks = [
  { label: '协会理念与愿景', to: '/about' },
  { label: '成员与组织结构', to: '/members' },
  { label: '近期活动与项目', to: '/activities' },
  { label: '合作伙伴计划', to: '/partners' },
  { label: '加入我们', to: '/contact' }
]

const events = [
  { date: '2026.03', title: 'ZPA 科技周', desc: '探索前沿科技与社会影响，做 AI 与 Web3 的探索者。' },
  { date: '2026.02', title: 'ZPA 年度峰会', desc: '汇聚全体会员力量，共谋发展大计。' },
  { date: '2026.01', title: '守护者圆桌', desc: '讨论年度行动重点与资源协同方式。' }
]
</script>

<style scoped>
.zmy-hero {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(247, 249, 255, 0.82)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.2));
}

.zmy-grid-glow {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(31, 45, 88, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(31, 45, 88, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 35%, black 25%, transparent 80%);
}

.zmy-stat-card {
  border-radius: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 10px 30px rgba(23, 38, 83, 0.08);
  padding: 1rem 1.1rem;
}

.zmy-quick-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.76);
  padding: 0.72rem 0.85rem;
  font-size: 0.94rem;
  font-weight: 600;
  color: #33456e;
  transition: all 0.2s ease;
}

.zmy-quick-link:hover {
  transform: translateX(2px);
  border-color: rgba(255, 122, 0, 0.28);
  color: #ff7a00;
}
</style>
