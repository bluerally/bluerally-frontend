import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { MyProfileComponent } from '@/components/profile/MyProfileComponent';
import { NextPageWithLayout } from '../_app';

const Profile: NextPageWithLayout = () => {
  return <MyProfileComponent />;
};

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout>{page}</BottomMenuLayout>;
};

export default Profile;
