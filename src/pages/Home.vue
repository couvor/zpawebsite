<template>
  <section class="space-y-16">
    <RevealBlock>
      <div class="stripe-panel relative overflow-hidden p-10 md:p-14">
        <div class="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"></div>
        <div class="absolute -bottom-16 left-8 h-56 w-56 rounded-full bg-highlight/20 blur-3xl"></div>

        <div class="relative max-w-3xl space-y-6">
          <p class="stripe-kicker">ZPA Official Site</p>
          <h1 class="text-4xl font-extrabold leading-tight md:text-6xl">
            世界规模最大的非盈利性
            <span class="text-primary">张明旸保护组织</span>
          </h1>
          <p class="max-w-2xl text-lg leading-relaxed text-slateSoft">
            我们致力于让“附近”回归，成就喜欢无所事事的人，成就在图书馆读无用之书的人，成就用理想对抗现实的人。
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/activities" class="stripe-btn">查看最新活动</RouterLink>
            <RouterLink to="/about" class="stripe-btn-light">了解协会理念</RouterLink>
          </div>
        </div>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.1">
      <div class="grid gap-4 md:grid-cols-4">
        <article v-for="point in reasons" :key="point.title" class="stripe-soft p-6">
          <p class="stripe-kicker mb-2">WHY</p>
          <h3 class="text-xl font-bold">{{ point.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slateSoft">{{ point.text }}</p>
        </article>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.2">
      <div class="space-y-6">
        <div class="flex items-end justify-between">
          <h2 class="text-3xl font-bold md:text-4xl">协会理念</h2>
          <RouterLink to="/about" class="stripe-link">了解更多 →</RouterLink>
        </div>
        <div class="grid gap-5 md:grid-cols-3">
          <div v-for="idea in ideas" :key="idea.title" class="stripe-soft p-7">
            <h3 class="text-xl font-semibold">{{ idea.title }}</h3>
            <p class="mt-3 text-slateSoft">{{ idea.text }}</p>
          </div>
        </div>
      </div>
    </RevealBlock>

    <RevealBlock :delay="0.25">
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

const reasons = [
  { title: '公开透明', text: '关注信息公开与进度更新，建立可信、可追踪的行动档案。' },
  { title: '温和倡议', text: '坚持理性表达，以共识构建推动更广泛的社会关注。' },
  { title: '社群协作', text: '组团队，分工完成传播、记录、支持和反馈。' },
  { title: '长期守护', text: '不做一次性热度，持续迭代行动机制与资源连接。' }
]

const ideas = [
  { title: '环境责任', text: '善待地球就是善待生活在地球上的人，特别是那些深受环境风险影响的人。我们全力为世界各地的合作伙伴和社区提供支持，因为比起孤军奋战，团结起来能做到更多。' },
  { title: '教育发展', text: '要创造一个更加公正平等的世界，教育至关重要。为此，我们携手众多合作伙伴，与 100 多个国家及地区的求学者建立联系，为教育工作者们提供支持，创造各种校外学习机会，并推动种族平等与公正。当教育的大门能开得更大，每个人就能有更多途径来发挥自身潜能。' },
  { title: '创新创造', text: '让世界变得更美好，ZPA义不容辞。我们努力在业务所及之处践行 ZPA 的高标准，为全球供应链的人员和社群提供支持，并努力保护我们共有的地球。。' }
]

const events = [
  { date: '2026.03', title: 'ZPA 科技周', desc: '探索前沿科技与社会影响，做 AI 与 Web3 的探索者。' },
  { date: '2026.02', title: 'ZPA 年度峰会', desc: '汇聚全体会员力量，共谋发展大计。' },
  { date: '2026.01', title: '守护者圆桌', desc: '讨论年度行动重点与资源协同方式。' }
]
</script>
