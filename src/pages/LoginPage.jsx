import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { getExperimentVariant, isRolloutEnabled, trackEvent } from '../utils/growth';
import ParticleBackground from '../components/ParticleBackground';
import './LoginPage.css';

export default function LoginPage({ initialMode = 'login' }) {
  const initialResolvedMode = initialMode === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialResolvedMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { login, register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    const searchMode = new URLSearchParams(location.search).get('mode');
    const resolved =
      searchMode === 'register'
        ? 'register'
        : searchMode === 'login'
          ? 'login'
          : initialResolvedMode;

    setMode(resolved);
    setHasSubmitted(false);
    setError('');
  }, [location.pathname, location.search, initialResolvedMode]);

  useEffect(() => {
    if (mode === 'register') {
      trackEvent('signup_form_view', { variant: signupEntryVariant, path: location.pathname });
    } else {
      trackEvent('login_form_view', { path: location.pathname });
    }
  }, [mode, signupEntryVariant, location.pathname]);

  // 如果已登录，直接跳转首页
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateUsername = (value) => {
    const v = value.trim();
    if (!v) return '请输入用户名';
    if (v.length < 3) return '用户名至少 3 位';
    if (v.length > 50) return '用户名最多 50 位';
    if (!/^[a-zA-Z0-9_-]+$/.test(v)) return '用户名仅支持字母/数字/下划线/短横线';
    return '';
  };

  const validateEmail = (value) => {
    const v = value.trim();
    if (!v) return '请输入邮箱';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return '邮箱格式不正确';
    return '';
  };

  const validateLoginIdentifier = (value) => {
    const v = value.trim();
    if (!v) return '请输入邮箱或用户名';
    if (v.includes('@')) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return '邮箱格式不正确';
      return '';
    }
    if (v.length < 3) return '用户名至少 3 位';
    if (v.length > 50) return '用户名最多 50 位';
    if (!/^[a-zA-Z0-9_-]+$/.test(v)) return '用户名仅支持字母/数字/下划线/短横线';
    return '';
  };

  const validatePassword = (value) => {
    const v = value;
    if (!v) return '请输入密码';
    if (v.length < 8) return '密码至少 8 位';
    if (v.length > 100) return '密码最多 100 位';
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(v)) return '密码需包含字母和数字';
    return '';
  };

  const validateConfirmPassword = (value) => {
    if (!value) return '请确认密码';
    if (value !== password) return '两次输入的密码不一致';
    return '';
  };

  const usernameError = mode === 'register' ? validateUsername(username) : '';
  const emailError = mode === 'register' ? validateEmail(email) : validateLoginIdentifier(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError =
    mode === 'register' ? validateConfirmPassword(confirmPassword) : '';

  const isFormInvalid =
    mode === 'register'
      ? !!(usernameError || emailError || passwordError || confirmPasswordError)
      : !!(emailError || passwordError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHasSubmitted(true);

    if (isFormInvalid) return;

    setIsLoading(true);
    try {
      if (mode === 'register') {
        await registerUser({ username: username.trim(), email: email.trim(), password, confirmPassword });
        trackEvent('signup_submit_success', { variant: signupEntryVariant });
      } else {
        await login(email.trim(), password);
        trackEvent('login_submit_success', {});
      }
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || (mode === 'register' ? '注册失败，请重试' : '登录失败，请重试'));
      if (mode === 'register') {
        trackEvent('signup_submit_error', { variant: signupEntryVariant, message: err?.message || '' });
      } else {
        trackEvent('login_submit_error', { message: err?.message || '' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ParticleBackground particleCount={50} />
      <div className="login-page__gradient-orb"></div>

      {/* Back button */}
      <Link to="/" className="login-page__back" id="login-back-btn">
        <ArrowLeft size={18} />
        <span>返回首页</span>
      </Link>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo */}
        <div className="login-card__logo">
          <img src="/logo.png" alt="Morphic" className="login-card__logo-img" />
          <h1 className="login-card__logo-text">
            <span className="login-card__logo-cn">墨行笔记</span>
            <span className="login-card__logo-en">Morphic</span>
          </h1>
        </div>

        <div className="login-card__mode" role="tablist" aria-label="登录注册切换">
          <button
            type="button"
            className={`login-card__mode-btn ${mode === 'login' ? 'login-card__mode-btn--active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
              setHasSubmitted(false);
            }}
            role="tab"
            aria-selected={mode === 'login'}
          >
            登录
          </button>
          <button
            type="button"
            className={`login-card__mode-btn ${mode === 'register' ? 'login-card__mode-btn--active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
              setHasSubmitted(false);
            }}
            role="tab"
            aria-selected={mode === 'register'}
          >
            注册
          </button>
        </div>

        <p className="login-card__subtitle">{mode === 'register' ? '创建账号以继续' : '登录以继续'}</p>

        {/* Error message */}
        {error && (
          <motion.div
            className="login-card__error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-card__form" id="login-form">
          {mode === 'register' && (
            <div className="login-field">
              <label className="login-field__label" htmlFor="username">用户名</label>
              <div className="login-field__input-wrap">
                <input
                  id="username"
                  type="text"
                  className="login-field__input"
                  placeholder="3-50 位，仅字母/数字/下划线/短横线"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {(hasSubmitted || username.length > 0) && usernameError && (
                <div className="login-field__error">{usernameError}</div>
              )}
            </div>
          )}

          <div className="login-field">
            <label className="login-field__label" htmlFor="email">{mode === 'register' ? '邮箱' : '邮箱或用户名'}</label>
            <div className="login-field__input-wrap">
              <input
                id="email"
                type="text"
                className="login-field__input"
                placeholder={mode === 'register' ? '请输入邮箱' : '请输入邮箱或用户名'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={mode === 'register' ? 'email' : 'username'}
                autoFocus={mode === 'login'}
              />
            </div>
            {(hasSubmitted || email.length > 0) && emailError && (
              <div className="login-field__error">{emailError}</div>
            )}
          </div>

          <div className="login-field">
            <label className="login-field__label" htmlFor="password">密码</label>
            <div className="login-field__input-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="login-field__input"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="login-field__toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
                id="toggle-password-btn"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {(hasSubmitted || password.length > 0) && passwordError && (
              <div className="login-field__error">{passwordError}</div>
            )}
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label className="login-field__label" htmlFor="confirmPassword">确认密码</label>
              <div className="login-field__input-wrap">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="login-field__input"
                  placeholder="请再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="login-field__toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {(hasSubmitted || confirmPassword.length > 0) && confirmPasswordError && (
                <div className="login-field__error">{confirmPasswordError}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`login-card__submit ${isLoading ? 'login-card__submit--loading' : ''}`}
            disabled={isLoading}
            id="login-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="login-card__spinner" />
                {mode === 'register' ? '注册中...' : '登录中...'}
              </>
            ) : (
              <>
                {mode === 'register' ? <UserPlus size={18} /> : <LogIn size={18} />}
                {mode === 'register' ? '注册' : '登录'}
              </>
            )}
          </button>
        </form>

        <p className="login-card__hint">
          {mode === 'register'
            ? '注册后将自动登录'
            : '使用邮箱/用户名与密码登录'}
        </p>

        <div className="login-card__switch">
          {mode === 'register' ? (
            <Link to="/login" className="login-card__switch-link">
              已有账号？去登录
            </Link>
          ) : (
            <Link to="/register" className="login-card__switch-link">
              还没有账号？去注册
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
