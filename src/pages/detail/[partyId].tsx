import { Detail } from '@/components/detail/Detail';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const DetailPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Detail />
    </>
  );
};

export default DetailPage;
