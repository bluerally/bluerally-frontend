import { ProfileComponent } from '@/components/profile/Profile';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <ProfileComponent />
    </>
  );
};

export default ProfilePage;
