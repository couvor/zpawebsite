<template>
  <section class="space-y-20">
    <!-- Hero Section -->
    <RevealBlock>
      <div class="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-white/95 to-white/80 p-10 shadow-card md:p-16">
        <div class="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div class="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-highlight/25 blur-3xl"></div>

        <div class="relative max-w-4xl space-y-6">
          <p class="text-sm font-semibold tracking-[0.18em] text-primary">合作伙伴</p>
          <h1 class="text-4xl font-extrabold leading-tight text-textDeep md:text-6xl">
            与全球领先机构
            <span class="text-primary">携手同行</span>
          </h1>
          <p class="max-w-3xl text-lg leading-relaxed text-zinc-600">
            我们与来自学术界、产业界和非营利组织的杰出伙伴携手合作，共同推进张明旸保护事业，促进知识交流与创新实践。
          </p>
        </div>
      </div>
    </RevealBlock>

    <!-- Stats Section -->
    <RevealBlock :delay="0.1">
      <div class="grid gap-4 md:grid-cols-3">
        <article v-for="stat in stats" :key="stat.number" class="glass-card p-8 text-center">
          <p class="mb-2 text-4xl font-bold text-primary">{{ stat.number }}</p>
          <h3 class="text-lg font-semibold text-textDeep">{{ stat.label }}</h3>
          <p class="mt-2 text-sm text-zinc-600">{{ stat.description }}</p>
        </article>
      </div>
    </RevealBlock>

    <!-- Partner Categories -->
    <RevealBlock :delay="0.2">
      <div class="space-y-8">
        <h2 class="text-3xl font-bold md:text-4xl">合作领域</h2>

        <!-- Academic Partners -->
        <div class="space-y-4">
          <h3 class="flex items-center gap-3 text-xl font-semibold text-textDeep">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">🎓</span>
            学术合作机构
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="partner in academicPartners" :key="partner.name" class="glass-card group overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-3 flex-1">
                  <img v-if="partner.logo" :src="partner.logo" :alt="partner.name" class="h-12 w-12 object-contain rounded-lg bg-white/50 p-1" />
                  <h4 class="font-semibold text-textDeep">{{ partner.name }}</h4>
                </div>
                <span class="text-2xl ml-2">{{ partner.icon }}</span>
              </div>
              <p class="text-sm text-zinc-600">{{ partner.description }}</p>
              <p v-if="partner.focus" class="mt-3 text-xs font-medium text-primary">{{ partner.focus }}</p>
            </div>
          </div>
        </div>

        <!-- Industry Partners -->
        <div class="space-y-4">
          <h3 class="flex items-center gap-3 text-xl font-semibold text-textDeep">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-highlight/20 text-highlight">💼</span>
            产业合作伙伴
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="partner in industryPartners" :key="partner.name" class="glass-card group overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-semibold text-textDeep">{{ partner.name }}</h4>
                <span class="text-2xl">{{ partner.icon }}</span>
              </div>
              <p class="text-sm text-zinc-600">{{ partner.description }}</p>
              <p v-if="partner.focus" class="mt-3 text-xs font-medium text-highlight">{{ partner.focus }}</p>
            </div>
          </div>
        </div>

        <!-- NGO Partners -->
        <div class="space-y-4">
          <h3 class="flex items-center gap-3 text-xl font-semibold text-textDeep">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">🤝</span>
            非营利组织
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="partner in ngoPartners" :key="partner.name" class="glass-card group overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-semibold text-textDeep">{{ partner.name }}</h4>
                <span class="text-2xl">{{ partner.icon }}</span>
              </div>
              <p class="text-sm text-zinc-600">{{ partner.description }}</p>
              <p v-if="partner.focus" class="mt-3 text-xs font-medium text-green-600">{{ partner.focus }}</p>
            </div>
          </div>
        </div>
      </div>
    </RevealBlock>

    <!-- Collaboration Process -->
    <RevealBlock :delay="0.3">
      <div class="space-y-6">
        <h2 class="text-3xl font-bold md:text-4xl">合作方式</h2>
        <div class="grid gap-5 md:grid-cols-4">
          <div v-for="(process, index) in collaborationProcess" :key="index" class="glass-card p-7">
            <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold">
              {{ index + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-textDeep">{{ process.stage }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-zinc-600">{{ process.description }}</p>
          </div>
        </div>
      </div>
    </RevealBlock>

    <!-- CTA Section -->
    <RevealBlock :delay="0.4">
      <div class="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/10 to-highlight/10 p-12 md:p-16">
        <div class="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>

        <div class="relative max-w-3xl space-y-6">
          <h2 class="text-3xl font-bold md:text-4xl">
            <span class="text-primary">成为合作伙伴</span>
          </h2>
          <p class="text-lg leading-relaxed text-zinc-700">
            如果您的组织对张明旸保护事业充满热情，我们欢迎各种形式的合作。无论是学术研究、资源共享还是联合倡议，请与我们联系。
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/contact" class="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-glow transition hover:-translate-y-0.5">
              联系我们
            </RouterLink>
            <a href="mailto:partnership@example.com" class="rounded-2xl border border-primary/30 bg-white px-6 py-3 font-semibold text-primary transition hover:bg-primary/10">
              发送邮件
            </a>
          </div>
        </div>
      </div>
    </RevealBlock>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import RevealBlock from '../components/RevealBlock.vue'

const stats = [
  { number: '50+', label: '合作机构', description: '来自全球各地的知名组织' },
  { number: '15+', label: '国家地区', description: '国际化的合作网络' },
  { number: '100+', label: '联合项目', description: '共同推进的创新倡议' }
]

const academicPartners = [
  {
    name: '北京大学',
    icon: '🎓',
    logo: 'https://via.placeholder.com/48?text=PKU',
    description: '在生物保护与可持续发展领域展开深度研究合作',
    focus: '研究 · 教育 · 知识交流'
  },
  {
    name: '清华大学',
    icon: '📚',
    logo: 'https://via.placeholder.com/48?text=TsingHua',
    description: '联合开展技术创新与数据分析项目',
    focus: '科技创新 · 数据应用'
  },
  {
    name: '复旦大学',
    icon: '🔬',
    logo: 'https://via.placeholder.com/48?text=Fudan',
    description: '协同推进野生动物保护的科学研究',
    focus: '基础研究 · 学术发布'
  },
  {
    name: '南京大学',
    icon: '🌍',
    logo: 'https://via.placeholder.com/48?text=NJU',
    description: '开展生态系统评估与保护战略研究',
    focus: '生态保护 · 战略规划'
  },
  {
    name: '浙江大学',
    icon: '🏫',
    logo: 'https://via.placeholder.com/48?text=ZJU',
    description: '在农业生态与野生动物保护领域展开创新研究',
    focus: '生态农业 · 野生动物管理'
  },
  {
    name: '西安电子科技大学',
    icon: '📡',
    logo: 'https://via.placeholder.com/48?text=XIDIAN',
    description: '运用先进遥感与信息技术支持生态监测',
    focus: '遥感监测 · 信息技术'
  },
  {
    name: '西安邮电大学',
    icon: '📞',
    logo: 'https://via.placeholder.com/48?text=XUPT',
    description: '通过信息通信技术助力保护工作的公众参与',
    focus: '通信技术 · 公众互动'
  }
]

const industryPartners = [
  {
    name: '世界自然基金会(WWF)',
    icon: '🐼',
    description: '全球最大的独立环保组织，推进物种保护',
    focus: '国际合作 · 资源配置'
  },
  {
    name: 'TechForChange',
    icon: '💻',
    description: '运用技术创新支持生态保护工作',
    focus: '技术支持 · 数字化转型'
  },
  {
    name: '绿色未来基金会',
    icon: '🌱',
    description: '专注于可持续发展和环境保护投资',
    focus: '基金支持 · 项目融资'
  },
  {
    name: 'Conservation Media Lab',
    icon: '📺',
    description: '通过媒体和传播放大保护声音',
    focus: '传播 · 品牌建设'
  }
]

const ngoPartners = [
  {
    name: '国际自然保护联盟(IUCN)',
    icon: '🌐',
    description: '全球最大的环保专业网络，制定保护标准',
    focus: '标准制定 · 政策倡议'
  },
  {
    name: '地球保护基金会',
    icon: '🌍',
    description: '致力于保护地球生物多样性',
    focus: '多样性保护 · 社区参与'
  },
  {
    name: '野生救援(WildAid)',
    icon: '🦁',
    description: '通过改变人类行为保护野生动物',
    focus: '行为改变 · 公众教育'
  },
  {
    name: '本地保护社区',
    icon: '👥',
    description: '与各地社区组织紧密合作，实现保护目标',
    focus: '社区赋能 · 本地行动'
  }
]

const collaborationProcess = [
  {
    stage: '沟通与了解',
    description: '深入沟通合作理念、资源与期望，确保目标一致'
  },
  {
    stage: '方案设计',
    description: '共同设计合作框架，明确各方职责与资源投入'
  },
  {
    stage: '联合执行',
    description: '基于合作协议，携手推进具体项目与计划实施'
  },
  {
    stage: '评估与优化',
    description: '定期评估成果，持续优化合作机制与效果'
  }
]
</script>

<style scoped>
.glass-card {
  @apply rounded-xl border border-white/40 bg-white/40 backdrop-blur-xl;
}
</style>
