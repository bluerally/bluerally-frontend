import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/common/Loading';
import { CreateParty } from '@/components/create-party/CreateParty';
import { useGetPartyDetails } from '@/hooks/api/party';

const ModifyPartyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data, isLoading } = useGetPartyDetails(partyId, !!id);

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

  return loading ? <Loading /> : <CreateParty partyDetail={data?.data} />;
};

export default ModifyPartyPage;
