import { Like } from '@/components/like/Like';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const LikePage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Like />
    </>
  );
};

export default LikePage;
