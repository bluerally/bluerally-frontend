import React from 'react';

import { NextPageWithLayout } from './_app';
import Main from '@/components/Main';
import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';

const Home: NextPageWithLayout = () => {
  return <Main />;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout isShowFooter>{page}</BottomMenuLayout>;
};

export default Home;
