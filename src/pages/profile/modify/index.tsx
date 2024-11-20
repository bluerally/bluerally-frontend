import { HeadTitle } from '@/components/common/Head';
import { ProfileModify } from '@/components/profile/modify/ProfileModify';
import { NextPageWithLayout } from '@/pages/_app';

const ProfileModifyPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <ProfileModify />
    </>
  );
};

export default ProfileModifyPage;
