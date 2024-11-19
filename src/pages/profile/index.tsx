import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { NextPageWithLayout } from '../_app';
import { MyProfile } from '@/components/profile/MyProfile';
import { ACCESS_TOKEN_KEY } from '@/constants/common';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const accessToken = req.cookies[ACCESS_TOKEN_KEY];

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const MyProfilePage: NextPageWithLayout = () => {
  return <MyProfile />;
};

MyProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout>{page}</BottomMenuLayout>;
};

export default MyProfilePage;
