import {
  GetNotificationListResponse,
  GetNotificationsCountResponse,
  PostNotificationListRequestBody,
} from '@/@types/notification/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'bluerally-design-system';

const NotificationApi = {
  get: (page = 1) => {
    return requester.get<GetNotificationListResponse>(
      `/notifications?page=${page}`,
    );
  },

  post: (
    read_notification_list: PostNotificationListRequestBody['read_notification_list'],
  ) => {
    return requester.post(`/notifications/read`, {
      read_notification_list: read_notification_list,
    });
  },

  getCount: () => {
    return requester.get<GetNotificationsCountResponse>(`/notifications/count`);
  },
};

const useGetNotificationList = (page = 1, isSearch = true) => {
  const queryKey = ['notification-list', page];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => NotificationApi.get(page), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.warning({ content: `${error.code} 알람 리스트 조회 실패` }),
  });
};

const usePostReadNotificationList = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation(
    (
      ReadNotificationList: PostNotificationListRequestBody['read_notification_list'],
    ) => NotificationApi.post(ReadNotificationList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notification-list']);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.warning({ content: `${error.code} 알람 읽기 실패` }),
    },
  );
};

const useGetNotificationsCount = (isSearch = true) => {
  const queryKey = ['notification-count'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => NotificationApi.getCount(), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.warning({ content: `${error.code} 알람 개수 조회 실패` }),
  });
};

export {
  NotificationApi,
  useGetNotificationList,
  usePostReadNotificationList,
  useGetNotificationsCount,
};
