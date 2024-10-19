import { Loading } from '@/components/common/Loading';
import { NextPageWithLayout } from '../../_app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { OrganizedPartyComponent } from '@/components/profile/organized-party/OrganizedPartyComponent';

const OrganizedParty: NextPageWithLayout = () => {
  const router = useRouter();
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

  return loading ? <Loading /> : <OrganizedPartyComponent />;
};

export default OrganizedParty;
