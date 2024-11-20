import { Service } from '@/components/agreement/Service';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const ServicePage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Service />
    </>
  );
};

export default ServicePage;
