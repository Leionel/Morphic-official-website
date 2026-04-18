import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USER_STORAGE_KEY = 'coglab_user';
const TOKEN_STORAGE_KEY = 'token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapAuthError = (payload, fallbackMessage) => {
    const message = payload?.message || payload?.error || fallbackMessage;

    if (typeof message === 'string') {
      if (message.includes('Email already exists')) return '该邮箱已注册';
      if (message.includes('Username already exists')) return '用户名已存在';
      if (message.includes('Invalid email format')) return '邮箱格式不正确';
      if (message.includes('Invalid email or username format')) return '请输入正确的邮箱或用户名';
      if (message.includes('Email or username is required')) return '请输入邮箱或用户名';
      if (message.includes('Password must contain')) return '密码至少 8 位，且包含字母和数字';
      if (message.includes('Password must be at least')) return '密码至少 8 位';
      if (message.includes('Passwords do not match')) return '两次输入的密码不一致';
      if (message.includes('Username is required')) return '请输入用户名';
      if (message.includes('Email is required')) return '请输入邮箱';
      if (message.includes('Password is required')) return '请输入密码';
      if (message.includes('Confirm password is required')) return '请确认密码';
    }

    const details = Array.isArray(payload?.details) ? payload.details : [];
    if (details.length > 0) {
      const first = details[0];
      const detailMessage = first?.message;
      if (typeof detailMessage === 'string') {
        if (detailMessage.includes('Invalid email format')) return '邮箱格式不正确';
        if (detailMessage.includes('Password must contain')) return '密码至少 8 位，且包含字母和数字';
        if (detailMessage.includes('Password must be at least')) return '密码至少 8 位';
        if (detailMessage.includes('Passwords do not match')) return '两次输入的密码不一致';
        if (detailMessage.includes('Username must')) return '用户名格式不正确（3-50 位，仅字母/数字/下划线/短横线）';
        return detailMessage;
      }
    }

    return message;
  };

  // 初始化时从 localStorage 恢复登录状态
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const loadMe = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(USER_STORAGE_KEY);
          setToken(null);
          setUser(null);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        const userData = data.user || data;
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMe();
  }, [token]);

  const login = async (identifier, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: identifier, password }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(mapAuthError(payload, '登录失败，请检查邮箱/用户名和密码'));
    }

    const data = await response.json();
    const userData = data.user;
    const nextToken = data.token;

    setUser(userData);
    setToken(nextToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    return userData;
  };

  const register = async ({ username, email, password, confirmPassword }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(mapAuthError(payload, '注册失败，请检查输入信息'));
    }

    const data = await response.json();
    const userData = data.user;
    const nextToken = data.token;

    setUser(userData);
    setToken(nextToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
    return userData;
  };

  const logout = () => {
    const currentToken = token || localStorage.getItem(TOKEN_STORAGE_KEY);
    if (currentToken) {
      fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      }).catch(() => {});
    }

    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
