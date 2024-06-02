import { Header } from '@/components/layouts/Header';
import { Button, formatter } from 'bluerally-design-system';
import { ChevronLeft, CircleUser, CircleX, MessageCircle } from 'lucide-react';
import { useGetNotificationList } from '@/hooks/api/notification';
import { NoDataMessage } from '@/components/common/NoDataMessage';

export const Notification = () => {
  const { data } = useGetNotificationList();

  const notificationList = data?.data;

  const NOTIFICATION_TYPE = {
    comment: {
      name: '댓글',
      icon: <MessageCircle size={14} />,
      color: 'b-500',
    },
    participation_apply: {
      name: '신청',
      icon: <CircleUser size={14} />,
      color: 'b-500',
    },
    participation_approved: {
      name: '수락',
      icon: <></>,
      color: 'b-500',
    },
    participation_rejected: {
      name: '거절',
      icon: <CircleX size={14} />,
      color: 'error-600',
    },
    participation_cancel: {
      name: '취소',
      icon: <></>,
      color: 'error-600',
    },
    participation_closed: {
      name: '마감',
      icon: <CircleX size={14} />,
      color: 'b-500',
    },
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
      <div className="flex items-center justify-between p-5">
        <span className="text-lg">
          새소식
          <span className="pl-1 text-gray-400">
            {notificationList?.filter(({ is_read }) => !is_read).length}
          </span>
        </span>
        <Button color="gray" size="sm">
          모두 읽기
        </Button>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-center">
        {notificationList?.length ? (
          <div className="w-full bg-g-0">
            {notificationList.map(
              ({
                type,
                // type_detail,
                related_id,
                message,
                is_global,
                id,
                created_at,
                is_read,
              }) => (
                <div
                  key={id}
                  className={`p-5 border-b border-g-100 hover:bg-b-20 hover:cursor-pointer ${
                    !is_read && 'bg-b-50'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1 text-error-600 font-medium`}
                    // className={`flex items-center gap-1 font-medium text-${NOTIFICATION_TYPE[type_detail]?.color}`}
                  >
                    {/* {NOTIFICATION_TYPE[type_detail]?.icon}
                    {NOTIFICATION_TYPE[type_detail]?.type}
                     */}
                    <CircleX size={14} />
                    <span className="text-md">
                      마감
                      {/* {NOTIFICATION_TYPE[type_detail]?.name} */}
                    </span>
                  </div>
                  <div className=" text-md-2 text-g-950">{message}</div>
                  <div className="flex items-center justify-end gap-1 pt-1 text-basic text-g-400">
                    {formatter.dateTime(created_at)}
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <NoDataMessage message="아직 알람이 없어요" />
        )}
      </div>
    </>
  );
};
