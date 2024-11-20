import { Notification } from '@/components/notification/Notification';
import { NextPageWithLayout } from '../_app';
import { HeadTitle } from '@/components/common/Head';

const NotificationPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadTitle />
      <Notification />
    </>
  );
};

export default NotificationPage;
