import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { NextPageWithLayout } from '../_app';
import { MyProfile } from '@/components/profile/MyProfile';

const MyProfilePage: NextPageWithLayout = () => {
  return <MyProfile />;
};

MyProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout>{page}</BottomMenuLayout>;
};

export default MyProfilePage;
