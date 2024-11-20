import React from 'react';

import { NextPageWithLayout } from './_app';
import Main from '@/components/Main';
import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { HeadTitle } from '@/components/common/Head';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Main />
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout isShowFooter>{page}</BottomMenuLayout>;
};

export default Home;
