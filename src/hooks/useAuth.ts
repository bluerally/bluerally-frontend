import { useState, useEffect } from 'react';

const ACCESS_TOKEN_KEY = 'access_token';
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};
