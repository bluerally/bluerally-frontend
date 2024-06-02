import {
  DeleteLikeParams,
  GetLikeListResponse,
  PostLikeParams,
} from '@/@types/like/type';
import { GetNotificationListResponse } from '@/@types/notification/type';
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

  post: ({ party_id }: PostLikeParams) => {
    return requester.post(`party/like/${party_id}`, undefined, headers);
  },
};

const useGetNotificationList = () => {
  const queryKey = ['notification-list'];

  return useQuery(queryKey, () => NotificationApi.get(), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 알람 리스트 조회 실패`),
  });
};

// const usePostLike = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (partyId: PostLikeParams['party_id']) =>
//       LikeApi.post({ party_id: partyId }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(['like-list']);
//       },
//       onError: (error: AxiosError<any>) =>
//         window.alert(`${error.code} 파티 찜 등록하기 실패`),
//     },
//   );
// };

export { NotificationApi, useGetNotificationList };
