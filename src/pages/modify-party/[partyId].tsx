import { Loading } from '@/components/common/Loading';
import { CreateParty } from '@/components/create-party/CreateParty';
import { useGetPartyDetails } from '@/hooks/api/party';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

const ModifyPartyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { partyId: id } = router.query;

  const partyId = Number(id);

  const { data, isLoading } = useGetPartyDetails(partyId, !!id);

  return isLoading ? <Loading /> : <CreateParty partyDetail={data?.data} />;
};

export default ModifyPartyPage;
