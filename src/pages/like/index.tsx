import { Like } from '@/components/like/Like';
import { NextPageWithLayout } from '../_app';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';
import { Loading } from '@/components/common/Loading';

const LikePage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return;
    }

    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [isLoggedIn, router]);

  return loading ? <Loading /> : <Like />;
};

export default LikePage;
