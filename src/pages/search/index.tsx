import { BottomMenuLayout } from '@/components/layouts/BottomMenuLayout';
import { NextPageWithLayout } from '../_app';
import { Search } from '@/components/search/Search';

const SearchPage: NextPageWithLayout = () => {
  return <Search />;
};

SearchPage.getLayout = function getLayout(page: React.ReactElement) {
  return <BottomMenuLayout isShowFooter>{page}</BottomMenuLayout>;
};

export default SearchPage;
