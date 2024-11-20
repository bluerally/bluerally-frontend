import { CreateParty } from '@/components/create-party/CreateParty';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const CreatePartyPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <CreateParty />;
    </>
  );
};

export default CreatePartyPage;
