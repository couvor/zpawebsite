# 张明旸保护协会官网（Vue3 + Vercel）

一个带有柔和橙色光感、极简留白和流畅微动效的现代静态官网。

## 技术栈

- Vue 3 + Composition API
- Vite
- Vue Router
- TailwindCSS
- @motionone/vue
- @iconify/vue
- Animate.css

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：`http://localhost:5173`

## 生产构建

```bash
npm run build
npm run preview
```

## 页面路由

- `/` 首页 Home
- `/about` 协会介绍 About
- `/members` 成员 Members
- `/activities` 活动 Activities
- `/contact` 联系 Contact

## 主题色（橙色系）

在 `tailwind.config.js` 中定义：

- `primary: #FF7A00`
- `primaryLight: #FF8F33`
- `primaryBg: #FEEBDC`

## Vercel 部署

### 方式 1：连接 Git 仓库（推荐）

1. 将本项目推送到 GitHub / GitLab / Bitbucket
2. 在 Vercel 导入该仓库
3. Framework Preset 选择 `Vite`（通常会自动识别）
4. 点击 Deploy

### 方式 2：Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## 可替换内容

- `src/pages/Contact.vue` 的二维码占位区域替换为真实二维码图片
- `src/pages/*` 的文案替换为协会真实信息
- `src/pages/Activities.vue` 的活动数据替换为真实活动记录

## 目录结构

```text
src/
├── assets/styles/index.css
├── components/
│   ├── RevealBlock.vue
│   ├── SiteFooter.vue
│   └── SiteHeader.vue
├── pages/
│   ├── Home.vue
│   ├── About.vue
│   ├── Members.vue
│   ├── Activities.vue
│   └── Contact.vue
├── router/index.js
├── App.vue
└── main.js
```
