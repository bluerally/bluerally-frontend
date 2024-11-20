import { NextPageWithLayout } from '../../_app';
import { OrganizedParty } from '@/components/profile/organized-party/OrganizedParty';

const OrganizedPartyPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <OrganizedParty />
    </>
  );
};

export default OrganizedPartyPage;
