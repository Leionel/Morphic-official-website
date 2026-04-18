# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

墨行笔记 (Morphic) 官网 - 一款学术 AI 无限画布工具的产品介绍网站，包含炫酷的首页展示和登录功能。

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Vite 8** + **React 19** - 项目框架
- **React Router DOM v7** - 客户端路由
- **Framer Motion** - 动画效果库
- **Lucide React** - 图标库
- **CSS Variables** - 设计令牌系统（无 CSS 框架）

### Brand Design System
品牌色系基于墨绿色渐变，定义于 `src/index.css`:
- **深色背景**: `#050a08` (primary) / `#0d1512` (secondary)
- **墨绿渐变**: `#1a3a2a` → `#2d6a4f` → `#52b788`
- **字体**: Inter (UI) + Noto Serif SC (学术标题)

### Routing Structure
```
/           -> HomePage (单页滚动式，含 Hero/Features/Highlights/Roadmap/Footer)
/login      -> LoginPage (独立页面，无导航栏)
```

### Authentication System
- **AuthContext** (`src/context/AuthContext.jsx`) 管理全局登录状态
- localStorage 持久化用户数据 (`coglab_user` key)
- **API 集成**: 修改 `API_BASE_URL` 变量接入真实后端；未配置时默认允许任意用户名密码登录（开发模式）
- 登录后导航栏显示用户名和退出按钮

### Key Components
- **ParticleBackground** - Canvas 粒子网络动画，用于 Hero 和登录页背景
- **ScrollReveal** - 基于 Intersection Observer 的滚动触发动画包装器
- **Navbar** - 透明背景 + 滚动毛玻璃效果，登录状态感知

### Animation Patterns
- 使用 CSS keyframes 定义基础动画（`breathe`, `float`, `fadeInUp` 等）
- 使用 Framer Motion 处理复杂交互（页面过渡、悬停效果、手势动画）
- 粒子系统使用原生 Canvas API，支持鼠标交互

## File Conventions

- `.jsx` 用于 React 组件，`.css` 用于同目录样式
- 组件使用默认导出，hooks 使用命名导出
- CSS 使用 CSS Variables 进行主题管理，避免硬编码颜色
