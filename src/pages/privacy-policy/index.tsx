import { HeadTitle } from '@/components/common/Head';
import { NextPageWithLayout } from '../_app';
import { PrivacyPolicy } from '@/components/agreement/PrivacyPolicy';

const PrivacyPolicyPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
