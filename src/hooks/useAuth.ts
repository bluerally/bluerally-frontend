import { useState, useEffect } from 'react';
import { useNavigate } from './useNavigate';

export const useAuth = () => {
  const { pushToRoute } = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    setIsLoggedIn(!!token);
  }, [pushToRoute]);

  return isLoggedIn;
};
