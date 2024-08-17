import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Login } from '@/components/login/Login';
import { NextPageWithLayout } from '../_app';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/common/Loading';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return;
    }

    if (isLoggedIn) {
      const redirectUrl = (router.query.redirect as string) || '/';
      router.replace(redirectUrl);
      return;
    }

    setLoading(false);
  }, [isLoggedIn, router]);

  if (loading) {
    return <Loading />;
  }

  return <Login />;
};

export default LoginPage;
