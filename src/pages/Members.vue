<template>
  <section class="space-y-10">
    <RevealBlock>
      <div class="stripe-panel space-y-4 p-8 md:p-12">
        <p class="stripe-kicker">Members</p>
        <h1 class="text-4xl font-extrabold md:text-5xl">成员介绍</h1>
        <p class="text-slateSoft">多元背景成员共同协作，推动守护行动持续发生。</p>
      </div>
    </RevealBlock>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(member, index) in members"
        :key="member.name"
        :initial="{ opacity: 0, y: 28 }"
        :in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.65, delay: index * 0.08, easing: [0.22, 1, 0.36, 1] }"
        class="stripe-soft overflow-hidden p-6"
      >
        <div class="mb-5 h-20 w-20 rounded-full bg-gradient-to-br from-primary to-highlight p-[2px]">
          <div class="flex h-full w-full items-center justify-center rounded-full bg-white text-xl font-bold text-primary">
            {{ member.name.slice(0, 1) }}
          </div>
        </div>
        <h3 class="text-xl font-bold">{{ member.name }}</h3>
        <p class="mt-1 text-sm text-primary">{{ member.role }}</p>
        <p class="mt-4 text-sm leading-relaxed text-slateSoft">{{ member.desc }}</p>
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from '@motionone/vue'
import RevealBlock from '../components/RevealBlock.vue'

const members = [
  { name: '尹梓旭', role: '执行会长', desc: '负责协会日常运营与战略规划。' },
  { name: '张明旸', role: '首席科学家', desc: '负责协会科研与前沿科技探索。' },
  { name: '羿德钰', role: '副会长', desc: '协调线下活动与协会网络技术支持。' },
  { name: '汪桠然', role: '副会长', desc: '维护成员沟通氛围，关注反馈与心理支持。' },
  { name: '欧阳兆秦', role: '浙江大学支部部长', desc: '负责前沿科技探索，并管理协会驻浙江业务。' },
  { name: '谈宇森', role: '西安理工大学支部部长，协会驻朝鲜办事处主任', desc: '负责协会与朝方友好交流' },
  { name: '宋明元', role: '高级工程师', desc: '负责协会工程事务' },
  { name: '谈宇森', role: '西安理工大学支部部长', desc: '负责官网迭代、数据归档与线上协作工具。' },  
  { name: '汪俊', role: '美利坚白宫发言人', desc: '负责协会驻白宫事务' },
  { name: '柯予梓', role: '山东大学支部laoda', desc: 'man!' },
  { name: '蔡昕辰', role: '重庆大学支部部长，协会高级物理学家', desc: '负责协会重庆地区事务管理和高能物理研究' },
  { name: '任子行', role: '河北工业大学支部部长，授时中心主任', desc: '负责协会天津地区事务管理和原子钟研究' }


]
</script>
