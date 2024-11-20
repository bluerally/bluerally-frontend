import { ParticipationParty } from '@/components/profile/participation-party/ParticipationParty';
import { NextPageWithLayout } from '../../_app';
import { HeadTitle } from '@/components/common/Head';

const ParticipationPartyPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <ParticipationParty />
    </>
  );
};

export default ParticipationPartyPage;
