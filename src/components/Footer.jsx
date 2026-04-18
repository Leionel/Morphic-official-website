import { Link } from 'react-router-dom';
import { GitFork, Globe, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__glow"></div>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/logo.png" alt="Morphic" className="footer__logo-img" />
              <span className="footer__logo-text">Morphic 墨行笔记</span>
            </div>
            <p className="footer__description">
              AI 驱动的无限画布平台<br />
              让思维自由延展，让知识生动呈现
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">产品</h4>
            <Link to="/" className="footer__link">功能介绍</Link>
            <Link to="/" className="footer__link">开发路线</Link>
            <Link to="/" className="footer__link">更新日志</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">资源</h4>
            <Link to="/" className="footer__link">使用文档</Link>
            <Link to="/" className="footer__link">API 参考</Link>
            <Link to="/" className="footer__link">社区论坛</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">关注我们</h4>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="GitHub">
                <GitFork size={18} />
              </a>
              <a href="#" className="footer__social" aria-label="Twitter">
                <Globe size={18} />
              </a>
              <a href="#" className="footer__social" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Morphic (墨行笔记). All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/" className="footer__bottom-link">隐私政策</Link>
            <Link to="/" className="footer__bottom-link">使用条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
