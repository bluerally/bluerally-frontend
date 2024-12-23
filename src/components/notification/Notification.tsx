import { NoDataMessage } from '@/components/common/NoDataMessage';
import { Header } from '@/components/layouts/Header';
import {
  useGetNotificationList,
  usePostReadNotificationList,
} from '@/hooks/api/notification';
import { Button, formatter } from 'buooy-design-system';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from '../common/Loading';

export const Notification = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetNotificationList(page);
  const { mutate: readNotificationList } = usePostReadNotificationList();

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const notificationList = data?.data.notifications;
  const totalPage = data?.data.total_pages ?? 1;

  type NotificationClassification =
    | 'comment'
    | 'participation_apply'
    | 'participation_approved'
    | 'participation_rejected'
    | 'participation_cancel'
    | 'participation_closed';

  const NOTIFICATION_TYPE = {
    comment: '댓글',
    participation_apply: '파티 신청',
    participation_approved: '파티 승인',
    participation_rejected: '파티 거절',
    participation_cancel: '파티 취소',
    participation_closed: '파티 마감',
  };

  const isNotificationType = (
    type: string,
  ): type is NotificationClassification => {
    return type in NOTIFICATION_TYPE;
  };

  const notReadNotification = notificationList?.filter(
    ({ is_read }) => !is_read,
  );

  const handleReadAllNotification = () => {
    const notReadNotificationList = notReadNotification?.map(({ id }) => id);
    if (!!notReadNotificationList?.length) {
      readNotificationList(notReadNotificationList);
    }
  };

  const handleClickNotification = (
    id: number,
    relatedId?: number,
    isRead?: boolean,
  ) => {
    if (!id || !relatedId) {
      return;
    }

    if (!isRead) {
      readNotificationList([id]);
    }

    router.push(`/detail/${relatedId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>알림</>}
      />
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-lg">
          새소식
          <span
            className={`pl-1 text-${
              !!notReadNotification?.length ? 'b-500' : 'gray-400'
            }`}
          >
            {notReadNotification?.length}
          </span>
        </span>
        {!!notReadNotification?.length && (
          <Button variant="gray-outline" onClick={handleReadAllNotification}>
            모두 읽기
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        {notificationList?.length ? (
          <div className="w-full bg-g-0">
            {notificationList.map(
              ({
                classification,
                message,
                id,
                created_at,
                is_read,
                related_id,
              }) => {
                const validClassification =
                  classification && isNotificationType(classification)
                    ? classification
                    : undefined;

                return (
                  <div
                    key={id}
                    className={`p-5 border-b border-t border-g-100 hover:cursor-pointer ${
                      !is_read && 'bg-g-50'
                    }`}
                    onClick={() =>
                      handleClickNotification(id, related_id, is_read)
                    }
                  >
                    <div
                      className={`flex items-start gap-3 font-medium text-g-500`}
                    >
                      <Image
                        src={`/icon/${classification}.png`}
                        alt="notification-icon"
                        width={28}
                        height={28}
                        priority
                      />
                      <div className="flex flex-col gap-[2px]">
                        <span className="font-bold text-md text-g-500">
                          {validClassification
                            ? NOTIFICATION_TYPE[validClassification]
                            : '알림'}
                        </span>
                        <div className="text-md text-g-900">{message}</div>
                        <div className="text-md text-g-400">
                          {formatter.dateTime(created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
            )}
            {page < totalPage && (
              <>
                <hr />
                <div className="p-5 bg-g-50 pb-14">
                  <Button
                    width="100%"
                    variant="gray-outline"
                    onClick={handleNextPage}
                  >
                    더보기
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <NoDataMessage message="아직 알람이 없어요" />
        )}
      </div>
    </>
  );
};
