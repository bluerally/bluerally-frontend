import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Notification } from '@/components/notification/Notification';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/common/Loading';

const NotificationPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useAuth();

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

  return loading ? <Loading /> : <Notification />;
};

export default NotificationPage;
