import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, Menu, X, UserPlus } from 'lucide-react';
import { getExperimentVariant, isRolloutEnabled, trackEvent } from '../utils/growth';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const signupEntryEnabled =
    import.meta.env.VITE_SIGNUP_ENTRY_ENABLED !== 'false' &&
    isRolloutEnabled(
      'signup_entry_enabled',
      Number.parseFloat(import.meta.env.VITE_SIGNUP_ENTRY_ROLLOUT || '1')
    );
  const signupEntryVariant = signupEntryEnabled
    ? getExperimentVariant('signup_entry_v1', ['nav', 'hero'])
    : 'nav';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!signupEntryEnabled || isAuthenticated) return;
    trackEvent('signup_entry_impression', { placement: 'navbar', variant: signupEntryVariant });
  }, [signupEntryEnabled, signupEntryVariant, isAuthenticated]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Morphic" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span>墨行笔记</span>
            <span className="navbar__logo-morphic">Morphic</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__links">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="navbar__link">
            功能
          </a>
          <a href="#highlights" onClick={(e) => scrollToSection(e, 'highlights')} className="navbar__link">
            亮点
          </a>
          <a href="#roadmap" onClick={(e) => scrollToSection(e, 'roadmap')} className="navbar__link">
            路线图
          </a>
        </div>

        {/* Auth Button */}
        <div className="navbar__actions">
          {isAuthenticated ? (
            <div className="navbar__user">
              <span className="navbar__user-name">
                {user?.displayName || user?.username || user?.email}
              </span>
              <button className="navbar__btn navbar__btn--ghost" onClick={handleLogout} id="logout-btn">
                <LogOut size={16} />
                退出
              </button>
            </div>
          ) : (
            <>
              {signupEntryEnabled && (
                <Link
                  to="/register"
                  className={`navbar__btn ${signupEntryVariant === 'nav' ? 'navbar__btn--primary' : 'navbar__btn--ghost'}`}
                  id="register-nav-btn"
                  onClick={() => trackEvent('signup_entry_click', { placement: 'navbar', variant: signupEntryVariant })}
                >
                  <UserPlus size={16} />
                  注册
                </Link>
              )}
              <Link
                to="/login"
                className={`navbar__btn ${signupEntryEnabled && signupEntryVariant === 'nav' ? 'navbar__btn--ghost' : 'navbar__btn--primary'}`}
                id="login-nav-btn"
                onClick={() => trackEvent('login_entry_click', { placement: 'navbar' })}
              >
                <LogIn size={16} />
                登录
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
          id="mobile-menu-btn"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="navbar__mobile-link">
          功能
        </a>
        <a href="#highlights" onClick={(e) => scrollToSection(e, 'highlights')} className="navbar__mobile-link">
          亮点
        </a>
        <a href="#roadmap" onClick={(e) => scrollToSection(e, 'roadmap')} className="navbar__mobile-link">
          路线图
        </a>
        <div className="navbar__mobile-divider"></div>
        {isAuthenticated ? (
          <button className="navbar__mobile-link" onClick={handleLogout}>
            退出登录
          </button>
        ) : (
          <>
            {signupEntryEnabled && (
              <Link
                to="/register"
                className={`navbar__mobile-link ${signupEntryVariant === 'nav' ? 'navbar__mobile-link--primary' : ''}`}
                onClick={() => trackEvent('signup_entry_click', { placement: 'navbar_mobile', variant: signupEntryVariant })}
              >
                注册
              </Link>
            )}
            <Link to="/login" className={`navbar__mobile-link ${!signupEntryEnabled || signupEntryVariant === 'nav' ? '' : 'navbar__mobile-link--primary'}`}>
              登录
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
