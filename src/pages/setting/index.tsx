import { Setting } from '@/components/setting/Setting';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const SettingPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Setting />
    </>
  );
};

export default SettingPage;
