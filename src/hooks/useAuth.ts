import { useState, useEffect } from 'react';
import { useNavigate } from './useNavigate';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const { pushToRoute } = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');

    if (!token) {
      setIsLoggedIn(false);
      pushToRoute('/login');
      return;
    }

    setIsLoggedIn(true);
  }, [pushToRoute]);

  return isLoggedIn;
};
