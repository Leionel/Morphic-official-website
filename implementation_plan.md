# Cognitive Lab 官网实施计划

## 概述

为 Cognitive Lab（一款学术 AI 无限画布工具）建立官方网站，包含一个炫酷的产品介绍首页和登录功能。

**技术栈**: Vite + React + React Router  
**品牌色系**: 黑白 + 墨绿色 (#1a3a2a 深墨绿 / #2d6a4f 中墨绿 / #52b788 亮墨绿)  
**字体**: Inter (UI) + Noto Serif SC (学术氛围标题)

---

## Proposed Changes

### 1. 项目初始化

#### [NEW] Vite + React 项目
- 使用 `npx create-vite` 在 `d:\cogntionlab` 目录初始化 React 项目
- 安装依赖：`react-router-dom`（路由）、`framer-motion`（动画）、`lucide-react`（图标）

---

### 2. 全局设计系统

#### [NEW] `src/index.css` - 全局样式与设计令牌
- CSS 变量定义品牌色系（墨绿渐变、黑白对比）
- 全局 reset 与排版规范
- 动画关键帧（呼吸感、浮现、粒子等）
- 响应式断点

#### [NEW] `src/App.jsx` - 路由配置
- `/` → 首页 (HomePage)
- `/login` → 登录页 (LoginPage)
- 全局导航栏组件

---

### 3. 首页 (HomePage) - 核心展示

首页设计为 **单页滚动式**，分为以下区块：

#### [NEW] `src/components/Navbar.jsx` - 顶部导航栏
- 透明背景，滚动后添加毛玻璃效果
- 左侧：Cognitive Lab 文字 Logo
- 右侧：导航链接（功能、愿景、登录按钮）
- 登录按钮高亮墨绿色，跳转到 `/login`

#### [NEW] `src/pages/HomePage.jsx` - 首页主体
- **Hero 区域**：
  - 大标题："思维的无限画布" + 副标题描述
  - 动态粒子/网格背景动画（纯 CSS/Canvas）
  - CTA 按钮："开始探索" / "登录"
  - 向下滚动提示箭头

- **功能展示区 (Features)**：
  - 卡片式展示 4 大核心功能阶段
  - 每张卡片带有图标、标题、简短描述
  - 悬停时卡片浮起 + 墨绿色边框高亮动画
  - 功能列表：
    1. 🧠 意图感知画布 - AI 驱动的无限画布
    2. 📚 交互式学习台 - 学术实验与可视化
    3. 🎬 多媒体创作 - 视频嵌入与内容生成
    4. 🗺️ 思维图谱 - 全局语义导航

- **产品亮点区 (Highlights)**：
  - 左右交替布局展示核心特性
  - 带有视觉演示动画（如"坍缩重构"动效模拟）
  - 滚动触发渐入动画

- **技术栈/愿景区 (Vision)**：
  - 时间线方式展示 4 个阶段的开发路线图
  - 墨绿色渐变连接线

- **Footer 底部**：
  - 品牌信息、版权声明
  - 社交链接占位

---

### 4. 登录页 (LoginPage)

#### [NEW] `src/pages/LoginPage.jsx` - 登录页面
- **布局**：居中登录卡片 + 背景动效
- **表单**：
  - 用户名输入框
  - 密码输入框（带显示/隐藏切换）
  - "登录"按钮（墨绿色渐变）
  - 记住密码复选框（可选）
- **交互**：
  - 输入框聚焦时的墨绿色边框动画
  - 按钮 hover/loading 状态
  - 登录成功后跳转回首页
  - 错误提示（用户名或密码错误）
- **API 集成**：
  - 预留 POST 请求接口，默认指向 placeholder URL
  - 请求体：`{ username, password }`
  - 响应处理：成功存储登录状态到 localStorage，失败显示错误

#### [NEW] `src/context/AuthContext.jsx` - 认证状态管理
- React Context 管理登录状态
- 提供 `login()`, `logout()`, `isAuthenticated` 
- 登录状态持久化到 localStorage

---

### 5. 动画与视觉效果

#### [NEW] `src/components/ParticleBackground.jsx` - 粒子背景
- Canvas 绘制的粒子网络动画
- 墨绿色粒子，鼠标交互响应
- 用于 Hero 区域和登录页背景

#### [NEW] `src/components/ScrollReveal.jsx` - 滚动动画包装器
- 基于 Intersection Observer 的滚动触发动画
- 支持渐入、上浮、缩放等效果

---

## 文件结构

```
d:\cogntionlab\
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── ScrollReveal.jsx
│   │   └── Footer.jsx
│   └── pages/
│       ├── HomePage.jsx
│       └── LoginPage.jsx
```

## 验证计划

### 自动化验证
- 运行 `npm run dev` 启动开发服务器
- 浏览器访问首页，验证所有区块渲染与动画效果
- 浏览器访问登录页，验证表单交互
- 测试路由跳转（首页 ↔ 登录页）

### 手动验证
- 截图展示首页各区块效果
- 验证登录流程（模拟成功/失败场景）
- 检查响应式布局适配
