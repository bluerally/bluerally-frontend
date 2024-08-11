import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Notification } from '@/components/notification/Notification';
import { NextPageWithLayout } from '../_app';
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
      router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    setLoading(false);
  }, [isLoggedIn, router]);

  if (loading) {
    return <Loading />;
  }

  return <Notification />;
};

export default NotificationPage;
