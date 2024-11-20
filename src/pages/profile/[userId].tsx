import { ProfileComponent } from '@/components/profile/Profile';
import { NextPageWithLayout } from '../_app';

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <ProfileComponent />
    </>
  );
};

export default ProfilePage;
