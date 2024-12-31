import {
  DeleteLikeParams,
  GetLikeListResponse,
  PostLikeParams,
} from '@/@types/like/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'buooy-design-system';

const LikeApi = {
  get: () => {
    return requester.get<GetLikeListResponse>(`/user/party/like`);
  },

  post: ({ party_id }: PostLikeParams) => {
    return requester.post(`party/like/${party_id}`, undefined);
  },

  delete: ({ party_id }: DeleteLikeParams) => {
    return requester.delete(`party/like/${party_id}`);
  },
};

const useGetLikeList = (enabled?: boolean) => {
  const queryKey = ['like-list'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => LikeApi.get(), {
    enabled,
    onError: (error: AxiosError<any>) =>
      snackbar.warning({ content: `${error.code} 찜 리스트 조회 실패` }),
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
        snackbar.warning({ content: `${error.code} 모임 찜 등록하기 실패` }),
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
        snackbar.warning({ content: `${error.code} 모임 찜 삭제하기 실패` }),
    },
  );
};

export { LikeApi, useGetLikeList, usePostLike, useDeleteLike };
