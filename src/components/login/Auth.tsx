import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/common';
import { AuthContext } from '@/contexts/AuthContext';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const Auth = () => {
  const router = useRouter();

  const { updateIsLogin } = useContext(AuthContext);

  const accessToken = router.query.access_token;
  const refreshToken = router.query.refresh_token;

  if (accessToken) {
    setCookie(ACCESS_TOKEN_KEY, accessToken);
    setCookie(REFRESH_TOKEN_KEY, refreshToken);

    router.push(`/`);
    updateIsLogin(true);
  }

  return <></>;
};

export default Auth;
