import { Header } from '@/components/layouts/Header';
import { Button, formatter } from 'bluerally-design-system';
import {
  CalendarX,
  ChevronLeft,
  ContactRound,
  MessageCircle,
  UserCheck,
  UserMinus,
  UserX,
} from 'lucide-react';
import {
  useGetNotificationList,
  usePostReadNotificationList,
} from '@/hooks/api/notification';
import { NoDataMessage } from '@/components/common/NoDataMessage';
import React from 'react';

export const Notification = () => {
  const { data } = useGetNotificationList();
  const { mutate: readNotificationList } = usePostReadNotificationList();

  const notificationList = data?.data;

  type NotificationClassification =
    | 'comment'
    | 'participation_apply'
    | 'participation_approved'
    | 'participation_rejected'
    | 'participation_cancel'
    | 'participation_closed';

  type NotificationType = Record<
    NotificationClassification,
    { name: string; icon: React.ReactNode; color: string }
  >;

  const NOTIFICATION_TYPE: NotificationType = {
    comment: {
      name: '댓글',
      icon: <MessageCircle size={14} />,
      color: 'b-500',
    },
    participation_apply: {
      name: '신청 완료',
      icon: <ContactRound size={14} />,
      color: 'b-500',
    },
    participation_approved: {
      name: '수락됨',
      icon: <UserCheck size={14} />,
      color: 'b-500',
    },
    participation_rejected: {
      name: '거절됨',
      icon: <UserMinus size={14} />,
      color: 'error-600',
    },
    participation_cancel: {
      name: '취소함',
      icon: <UserX size={14} />,
      color: 'error-600',
    },
    participation_closed: {
      name: '마감됨',
      icon: <CalendarX size={14} />,
      color: 'b-500',
    },
  };

  const isNotificationType = (
    type: string,
  ): type is NotificationClassification => {
    return type in NOTIFICATION_TYPE;
  };

  const notReadNotification = notificationList?.filter(
    ({ is_read }) => !is_read,
  );

  const handleReadNotification = () => {
    const notReadNotificationList = notReadNotification?.map(({ id }) => id);

    if (!!notReadNotificationList?.length) {
      readNotificationList(notReadNotificationList);
    }
  };

  return (
    <>
      <Header
        left={
          <div className="cursor-pointer">
            <ChevronLeft size={24} />
          </div>
        }
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
        <Button color="gray" size="sm" onClick={handleReadNotification}>
          모두 읽기
        </Button>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-center">
        {notificationList?.length ? (
          <div className="w-full bg-g-0">
            {notificationList.map(
              ({ classification, message, id, created_at, is_read }) => {
                const validClassification =
                  classification && isNotificationType(classification)
                    ? classification
                    : undefined;

                return (
                  <div
                    key={id}
                    className={`p-5 border-b border-g-100 hover:bg-b-20 hover:cursor-pointer ${
                      !is_read && 'bg-b-50'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1 font-medium text-${
                        validClassification
                          ? NOTIFICATION_TYPE[validClassification]?.color
                          : 'default-color'
                      }`}
                    >
                      {validClassification &&
                        NOTIFICATION_TYPE[validClassification]?.icon}
                      <span className="text-md">
                        {validClassification
                          ? NOTIFICATION_TYPE[validClassification]?.name
                          : '알림'}
                      </span>
                    </div>
                    <div className=" text-md-2 text-g-950">{message}</div>
                    <div className="flex items-center justify-end gap-1 pt-1 text-basic text-g-400">
                      {formatter.dateTime(created_at)}
                    </div>
                  </div>
                );
              },
            )}
            {/* TODO: 페이지네이션 */}
            <hr />
            <div className="p-5 bg-g-50 pb-14">
              <Button width="100%" variant="outlined" color="gray">
                더보기
              </Button>
            </div>
          </div>
        ) : (
          <NoDataMessage message="아직 알람이 없어요" />
        )}
      </div>
    </>
  );
};
