import { ACCESS_TOKEN_KEY } from '@/constants/common';
import { createContext, useCallback, useEffect, useState } from 'react';

type Context = {
  isLogin: boolean;
  updateIsLogin: (value: boolean) => void;
  logout: () => void;
};

export const AuthContext = createContext<Context>({
  isLogin: false,
  updateIsLogin: () => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLogin, setIsLogin] = useState(false);

  const updateIsLogin = useCallback((value: boolean) => {
    if (value) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      setIsLogin(!!token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    setIsLogin(!!token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsLogin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, updateIsLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
