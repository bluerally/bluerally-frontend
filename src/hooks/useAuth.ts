import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const { isLogin, logout } = useContext(AuthContext);

  return { isLoggedIn: isLogin, logout };
};
