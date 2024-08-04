import {
  DeleteLikeParams,
  GetLikeListResponse,
  PostLikeParams,
} from '@/@types/like/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'bluerally-design-system';

const TOKEN = process.env.NEXT_PUBLIC_USER_TOKEN;

const headers = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const LikeApi = {
  get: () => {
    return requester.get<GetLikeListResponse>(`/user/party/like`, headers);
  },

  post: ({ party_id }: PostLikeParams) => {
    return requester.post(`party/like/${party_id}`, undefined, headers);
  },

  delete: ({ party_id }: DeleteLikeParams) => {
    return requester.delete(`party/like/${party_id}`, headers);
  },
};

const useGetLikeList = () => {
  const queryKey = ['like-list'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => LikeApi.get(), {
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 찜 리스트 조회 실패` }),
  });
};

const usePostLike = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation(
    (partyId: PostLikeParams['party_id']) =>
      LikeApi.post({ party_id: partyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['like-list']);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.error({ content: `${error.code} 파티 찜 등록하기 실패` }),
    },
  );
};

const useDeleteLike = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation(
    (partyId: DeleteLikeParams['party_id']) =>
      LikeApi.delete({ party_id: partyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['like-list']);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.error({ content: `${error.code} 파티 찜 삭제하기 실패` }),
    },
  );
};

export { LikeApi, useGetLikeList, usePostLike, useDeleteLike };
