import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, BookOpen, Film, Map,
  Sparkles, Pencil, FlaskConical, Layers,
  ChevronDown, ArrowRight, Zap, Target, Lightbulb,
  GraduationCap, Code2, BarChart3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getExperimentVariant, isRolloutEnabled, trackEvent } from '../utils/growth';
import ParticleBackground from '../components/ParticleBackground';
import ScrollReveal from '../components/ScrollReveal';
import Footer from '../components/Footer';
import './HomePage.css';

const features = [
  {
    icon: Brain,
    title: '意图感知画布',
    description: '基于 AI 的实时意图解析引擎，你的每一笔触碰都被理解。画布会根据上下文自动推断你的下一步操作，呈现最符合思维逻辑的交互形态。',
    tags: ['Apple Pencil', '意图坍缩', '智能锚点'],
    gradient: 'linear-gradient(135deg, #a83a2d, #d15647)',
  },
  {
    icon: BookOpen,
    title: '交互式学习台',
    description: '将静态知识转化为动态实验场。内置学术番茄钟、算法可视化器、数学模型模拟器、文献对比分析——将学习体验提升到实验台级别。',
    tags: ['模型模拟', '算法可视化', '交互实验'],
    gradient: 'linear-gradient(135deg, #2b6a9a, #478dc2)',
  },
  {
    icon: Film,
    title: '多媒体创作空间',
    description: '通过 MCP 协议接入外部内容生态与AI能力，画布上直接调取视频素材、生成知识摘要。创意来自四面八方，汇聚在你的画布上。',
    tags: ['MCP 协议', '视频嵌入', '内容生成'],
    gradient: 'linear-gradient(135deg, #4fa18c, #6fbdab)',
  },
  {
    icon: Map,
    title: '全局思维图谱',
    description: '像 Obsidian 一样的全局知识拓扑图，却拥有无限画布的自由度。通过语义索引在不同知识区域间瞬时跳转，手绘即刻实体化。',
    tags: ['语义索引', '草图实体化', '知识拓扑'],
    gradient: 'linear-gradient(135deg, #8b7f6f, #b3a696)',
  },
];

const highlights = [
  {
    icon: Sparkles,
    title: '意图坍缩与重构',
    subtitle: 'Advanced Morphing Redo',
    description: '当 AI 的猜测不符合你的意图时，它不会简单地撤销——而是像量子态坍缩一样，分析失败原因，从另一个维度重新展开全新的交互形态。从自动出题到图形化演示，每一次"重构"都是一次认知跃迁。',
    visual: 'collapse',
  },
  {
    icon: Pencil,
    title: '手写进化引擎',
    subtitle: 'Handwriting Evolution',
    description: '凌乱的手写笔记一键蜕变为结构化的学术文档。AI 识别笔迹中的逻辑层级，自动生成具备目录、引用和LaTeX公式的专业 Markdown 或 PDF。',
    visual: 'evolve',
  },
  {
    icon: FlaskConical,
    title: '概念补全与延伸',
    subtitle: 'Concept Auto-Complete',
    description: '写下"处处连续处处不可导"，AI 自动补全威尔斯塔拉斯函数及其证明。写下"谱定理"，实谱和复谱的完整内容自动展开。知识不再孤立，而是网状延伸。',
    visual: 'extend',
  },
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'MVP 核心交互',
    status: 'current',
    items: ['无限画布环境', '意图锚点系统', '坍缩重构引擎', 'Brainstorming 优化'],
    icon: Target,
  },
  {
    phase: 'Phase 2',
    title: '交互式学习台',
    status: 'upcoming',
    items: ['学术番茄钟', '模型模拟器', '算法可视化', '手写进化引擎'],
    icon: GraduationCap,
  },
  {
    phase: 'Phase 3',
    title: '创作平台上线',
    status: 'upcoming',
    items: ['MCP 协议接入', '视频嵌入关联', '知识摘要生成', '创作工作流'],
    icon: Code2,
  },
  {
    phase: 'Phase 4',
    title: '深度优化',
    status: 'future',
    items: ['全局思维图谱', '草图实体化', '多模态图形', '学术图表生成'],
    icon: BarChart3,
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const signupEntryEnabled =
    import.meta.env.VITE_SIGNUP_ENTRY_ENABLED !== 'false' &&
    isRolloutEnabled(
      'signup_entry_enabled',
      Number.parseFloat(import.meta.env.VITE_SIGNUP_ENTRY_ROLLOUT || '1')
    );
  const signupEntryVariant = signupEntryEnabled
    ? getExperimentVariant('signup_entry_v1', ['nav', 'hero'])
    : 'nav';
  const heroPrimaryTo =
    isAuthenticated
      ? '/'
      : signupEntryEnabled && signupEntryVariant === 'hero'
        ? '/register'
        : '/login';
  const heroPrimaryLabel =
    isAuthenticated
      ? '进入工作台'
      : signupEntryEnabled && signupEntryVariant === 'hero'
        ? '免费注册'
        : '开始探索';

  useEffect(() => {
    if (!signupEntryEnabled || isAuthenticated) return;
    if (signupEntryVariant === 'hero') {
      trackEvent('signup_entry_impression', { placement: 'hero_primary', variant: signupEntryVariant });
    }
  }, [signupEntryEnabled, signupEntryVariant, isAuthenticated]);

  return (
    <div className="home">
      {/* ====== Hero Section ====== */}
      <section className="hero" id="hero">
        <ParticleBackground particleCount={90} />
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>

        <div className="hero__content container">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="hero__badge">
              <Zap size={14} />
              <span>AI-Native Infinite Canvas</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h1 className="hero__title">
              思维的<span className="text-gradient">无限画布</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.35}>
            <p className="hero__subtitle">
              Morphic (墨行笔记) 是一款 AI 驱动的学术研究与创意协作平台。<br />
              在无限画布上，AI 感知你的意图，让知识探索变得直觉化、实验化、沉浸化。
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.5}>
            <div className="hero__actions">
              <Link
                to={heroPrimaryTo}
                className="hero__btn hero__btn--primary"
                id="hero-cta-btn"
                onClick={() => {
                  if (!isAuthenticated && signupEntryEnabled && signupEntryVariant === 'hero') {
                    trackEvent('signup_entry_click', { placement: 'hero_primary', variant: signupEntryVariant });
                  } else {
                    trackEvent('login_entry_click', { placement: 'hero_primary' });
                  }
                }}
              >
                <Sparkles size={18} />
                {heroPrimaryLabel}
              </Link>
              <a href="#features" className="hero__btn hero__btn--outline" id="hero-features-btn">
                了解更多
                <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.7}>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">4</span>
                <span className="hero__stat-label">核心模块</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-value">∞</span>
                <span className="hero__stat-label">画布空间</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-value">AI</span>
                <span className="hero__stat-label">意图驱动</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="hero__scroll-hint">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* ====== Features Section ====== */}
      <section className="features section" id="features">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">
              <Layers size={14} />
              Core Features
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">四大核心模块</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="section-subtitle">
              从意图感知到知识图谱，覆盖学术研究与创意协作的完整链路
            </p>
          </ScrollReveal>

          <div className="features__grid">
            {features.map((feature, index) => (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.1 + 0.2}>
                <div className="feature-card" id={`feature-card-${index}`}>
                  <div className="feature-card__icon-wrap" style={{ background: feature.gradient }}>
                    <feature.icon size={24} style={{ color: 'var(--white)' }} />
                  </div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.description}</p>
                  <div className="feature-card__tags">
                    {feature.tags.map((tag, i) => (
                      <span key={i} className="feature-card__tag">{tag}</span>
                    ))}
                  </div>
                  <div className="feature-card__glow"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Highlights Section ====== */}
      <section className="highlights section" id="highlights">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">
              <Lightbulb size={14} />
              Key Highlights
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">技术亮点</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="section-subtitle">
              每一个细节都经过精心设计，为你的思维流提供零摩擦体验
            </p>
          </ScrollReveal>

          <div className="highlights__list">
            {highlights.map((item, index) => (
              <ScrollReveal key={index} variant={index % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={0.2}>
                <div className={`highlight-row ${index % 2 !== 0 ? 'highlight-row--reverse' : ''}`}>
                  <div className="highlight-row__content">
                    <div className="highlight-row__icon-wrap">
                      <item.icon size={24} />
                    </div>
                    <span className="highlight-row__subtitle">{item.subtitle}</span>
                    <h3 className="highlight-row__title">{item.title}</h3>
                    <p className="highlight-row__desc">{item.description}</p>
                  </div>
                  <div className="highlight-row__visual">
                    <div className={`highlight-visual highlight-visual--${item.visual}`}>
                      {item.visual === 'collapse' && (
                        <div className="visual-collapse">
                          <div className="visual-collapse__orbit">
                            <motion.div
                              className="visual-collapse__particle"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                              className="visual-collapse__particle visual-collapse__particle--2"
                              animate={{ rotate: -360 }}
                              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            />
                          </div>
                          <div className="visual-collapse__core">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                              className="visual-collapse__glow"
                            />
                          </div>
                        </div>
                      )}
                      {item.visual === 'evolve' && (
                        <div className="visual-evolve">
                          <div className="visual-evolve__line visual-evolve__line--1"></div>
                          <div className="visual-evolve__line visual-evolve__line--2"></div>
                          <div className="visual-evolve__line visual-evolve__line--3"></div>
                          <motion.div
                            className="visual-evolve__arrow"
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <ArrowRight size={24} />
                          </motion.div>
                          <div className="visual-evolve__result">
                            <div className="visual-evolve__block"></div>
                            <div className="visual-evolve__block visual-evolve__block--2"></div>
                            <div className="visual-evolve__block visual-evolve__block--3"></div>
                          </div>
                        </div>
                      )}
                      {item.visual === 'extend' && (
                        <div className="visual-extend">
                          <motion.div
                            className="visual-extend__node visual-extend__node--center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="visual-extend__node visual-extend__node--1"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                          />
                          <motion.div
                            className="visual-extend__node visual-extend__node--2"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                          />
                          <motion.div
                            className="visual-extend__node visual-extend__node--3"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                          />
                          <svg className="visual-extend__lines" viewBox="0 0 200 200">
                            <line x1="100" y1="100" x2="50" y2="40" stroke="rgba(168,58,45,0.3)" strokeWidth="1" />
                            <line x1="100" y1="100" x2="160" y2="60" stroke="rgba(168,58,45,0.3)" strokeWidth="1" />
                            <line x1="100" y1="100" x2="140" y2="160" stroke="rgba(168,58,45,0.3)" strokeWidth="1" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Roadmap Section ====== */}
      <section className="roadmap section" id="roadmap">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">
              <Target size={14} />
              Development Roadmap
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="section-title">开发路线图</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="section-subtitle">
              四个阶段，从核心交互到完整的学术创作生态
            </p>
          </ScrollReveal>

          <div className="roadmap__timeline">
            <div className="roadmap__line"></div>
            {roadmap.map((phase, index) => (
              <ScrollReveal key={index} variant="fadeUp" delay={index * 0.15 + 0.2}>
                <div className={`roadmap-card roadmap-card--${phase.status}`} id={`roadmap-phase-${index}`}>
                  <div className="roadmap-card__dot">
                    <span className="roadmap-card__dot-inner"></span>
                  </div>
                  <div className="roadmap-card__content">
                    <div className="roadmap-card__header">
                      <div className="roadmap-card__icon">
                        <phase.icon size={20} />
                      </div>
                      <span className="roadmap-card__phase">{phase.phase}</span>
                      {phase.status === 'current' && (
                        <span className="roadmap-card__badge">进行中</span>
                      )}
                    </div>
                    <h3 className="roadmap-card__title">{phase.title}</h3>
                    <ul className="roadmap-card__items">
                      {phase.items.map((item, i) => (
                        <li key={i} className="roadmap-card__item">
                          <span className="roadmap-card__item-dot"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA Section ====== */}
      <section className="cta section" id="cta">
        <div className="cta__bg-glow"></div>
        <div className="container">
          <ScrollReveal variant="scaleUp">
            <div className="cta__card">
              <h2 className="cta__title">
                准备好重新定义<span className="text-gradient">知识探索</span>了吗？
              </h2>
              <p className="cta__subtitle">
                加入墨行笔记，体验 AI 驱动的无限画布
              </p>
              <Link
                to={
                  isAuthenticated
                    ? '/'
                    : signupEntryEnabled && signupEntryVariant === 'hero'
                      ? '/register'
                      : '/login'
                }
                className="hero__btn hero__btn--primary cta__btn"
                id="cta-login-btn"
                onClick={() => {
                  if (!isAuthenticated && signupEntryEnabled && signupEntryVariant === 'hero') {
                    trackEvent('signup_entry_click', { placement: 'cta_primary', variant: signupEntryVariant });
                  } else {
                    trackEvent('login_entry_click', { placement: 'cta_primary' });
                  }
                }}
              >
                <Sparkles size={18} />
                {isAuthenticated ? '进入工作台' : signupEntryEnabled && signupEntryVariant === 'hero' ? '免费注册' : '立即开始'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
