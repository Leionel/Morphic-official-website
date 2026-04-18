# Cognitive Lab 官网 - 工作总结

## 完成的工作

基于 **Vite + React** 从零搭建了 Cognitive Lab 产品官网，包含炫酷的产品介绍首页和完整的登录功能。

### 技术栈
| 技术 | 用途 |
|------|------|
| Vite 8 + React 19 | 项目框架 |
| React Router DOM | 页面路由 |
| Framer Motion | 动画效果 |
| Lucide React | 图标库 |
| CSS Variables | 设计令牌系统 |

### 品牌色系
- **主色**：墨绿渐变 `#1a3a2a` → `#2d6a4f` → `#52b788`
- **背景**：深色 `#050a08` / `#0d1512`
- **字体**：Inter (UI) + Noto Serif SC (标题)

---

## 首页区块

### 1. Hero 区域
- Canvas 粒子网络动画（80+ 粒子、连线效果、鼠标交互）
- 渐变发光球体背景装饰
- 核心口号："思维的无限画布"（墨绿渐变文字）
- CTA 按钮组 + 数据统计展示

### 2. 功能卡片 (Features)
- 2×2 网格布局，四大核心模块
- 悬停浮起 + 墨绿边框高亮 + 辉光效果
- 标签体系展示具体能力

### 3. 技术亮点 (Highlights)
- 左右交替布局，三大技术亮点
- 每项配有动态可视化插图（量子坍缩轨道动画、手写进化演示、概念网络节点）

### 4. 开发路线图 (Roadmap)
- 水平时间线，四阶段卡片
- 当前阶段呼吸感指示灯

### 5. CTA + Footer
- 底部号召行动区域
- 完整的 Footer（品牌信息、导航链接、社交图标）

---

## 登录系统

### 登录页
- 毛玻璃效果登录卡片 + 粒子背景
- 用户名/密码表单，密码显隐切换
- 加载中/错误/成功状态完整处理
- 呼吸感 Logo 动画

### 认证状态管理
- React Context 全局认证状态
- localStorage 持久化登录信息
- 预留 POST API 接口（`AuthContext.jsx` 中 `API_BASE_URL` 变量）
- 开发模式：任意用户名密码均可登录

---

## 修复的问题
1. **lucide-react 图标名变更**：新版移除了品牌图标 `Github`/`Twitter`，替换为 `GitFork`/`Globe`
2. **React 渲染阶段路由跳转**：LoginPage 中的 `navigate()` 从渲染体移至 `useEffect`

---

## 验证结果

### 浏览器测试

> [!TIP]
> 录屏文件：[final_verification.webp](file:///C:/Users/Administrator/.gemini/antigravity/brain/ea27ea49-02ec-4abc-be40-ba049f63b761/final_verification_1776478505164.webp)

````carousel
![登录页面 - 毛玻璃卡片 + 粒子背景](C:/Users/Administrator/.gemini/antigravity/brain/ea27ea49-02ec-4abc-be40-ba049f63b761/.system_generated/click_feedback/click_feedback_1776478583619.png)
<!-- slide -->
![首页亮点区域 - 概念补全与延伸](C:/Users/Administrator/.gemini/antigravity/brain/ea27ea49-02ec-4abc-be40-ba049f63b761/.system_generated/click_feedback/click_feedback_1776478572675.png)
````

- ✅ 所有页面正常加载，无控制台错误
- ✅ 粒子动画流畅运行
- ✅ 登录流程完整（输入 → 提交 → 跳转首页 → 显示用户名）
- ✅ 导航栏登录/退出状态正确切换

---

## 后续操作

### 接入真实 API
编辑 [AuthContext.jsx](file:///d:/cogntionlab/src/context/AuthContext.jsx)，将 `API_BASE_URL` 设置为实际接口地址：
```javascript
const API_BASE_URL = 'https://your-api.example.com';
```

### 替换 Logo
在 [Navbar.jsx](file:///d:/cogntionlab/src/components/Navbar.jsx) 中替换 `.navbar__logo-icon` 为实际 Logo 图片。

### 启动开发服务器
```bash
cd d:\cogntionlab
npm run dev
```
访问 http://localhost:5173/
