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
  get: (page = 1) => {
    return requester.get<GetNotificationListResponse>(
      `/user/notifications?page=${page}`,
      headers,
    );
  },

  post: (
    read_notification_list: PostNotificationListRequestBody['read_notification_list'],
  ) => {
    return requester.post(
      `/user/notifications/read`,
      { read_notification_list: read_notification_list },
      headers,
    );
  },
};

const useGetNotificationList = (page = 1) => {
  const queryKey = ['notification-list', page];

  return useQuery(queryKey, () => NotificationApi.get(page), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 알람 리스트 조회 실패`),
  });
};

const usePostReadNotificationList = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (
      ReadNotificationList: PostNotificationListRequestBody['read_notification_list'],
    ) => NotificationApi.post(ReadNotificationList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notification-list']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 알람 읽기 실패`),
    },
  );
};

export { NotificationApi, useGetNotificationList, usePostReadNotificationList };
