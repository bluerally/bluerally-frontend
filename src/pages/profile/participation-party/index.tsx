import { Loading } from '@/components/common/Loading';
import { NextPageWithLayout } from '../../_app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { ParticipationPartyComponent } from '@/components/profile/participation-party/ParticipationPartyComponent';

const ParticipationParty: NextPageWithLayout = () => {
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

  return loading ? <Loading /> : <ParticipationPartyComponent />;
};

export default ParticipationParty;
