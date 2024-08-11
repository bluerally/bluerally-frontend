import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Login } from '@/components/login/Login';
import { NextPageWithLayout } from '../_app';
import { Loading } from '@/components/common/Loading';
import { useAuth } from '@/hooks/useAuth';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return;
    }

    if (isLoggedIn) {
      router.push('/');
      return;
    }

    setLoading(false);
  }, [isLoggedIn, router]);

  return loading ? <Loading /> : <Login />;
};

export default LoginPage;
