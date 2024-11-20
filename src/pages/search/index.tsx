import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { NextPageWithLayout } from '../_app';
import { Search } from '@/components/search/Search';
import { HeadTitle } from '@/components/common/Head';

const SearchPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Search />
    </>
  );
};

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout isShowFooter>{page}</BottomMenuLayout>;
};

export default SearchPage;
