import {
  GetNotificationListResponse,
  PostNotificationListRequestBody,
} from '@/@types/notification/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_USER_TOKEN;

const headers = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const NotificationApi = {
  get: () => {
    return requester.get<GetNotificationListResponse>(
      `/user/notifications`,
      headers,
    );
  },

  post: ({ read_notification_list }: PostNotificationListRequestBody) => {
    return requester.post(
      `/user/notifications/read`,
      read_notification_list,
      headers,
    );
  },
};

const useGetNotificationList = () => {
  const queryKey = ['notification-list'];

  return useQuery(queryKey, () => NotificationApi.get(), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 알람 리스트 조회 실패`),
  });
};

const usePostReadNotificationList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (
      ReadNotificationList: PostNotificationListRequestBody['read_notification_list'],
    ) => NotificationApi.post({ read_notification_list: ReadNotificationList }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notification-list']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 알람 모두 읽기 실패`),
    },
  );
};

export { NotificationApi, useGetNotificationList, usePostReadNotificationList };
