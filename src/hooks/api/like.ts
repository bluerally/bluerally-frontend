import { GetLikeListResponse, PostLikeParams } from '@/@types/like/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTYyNjcxMjV9.BDwNAGTOtpL0WLDmkii4xUdDEccrrMOPOmlKSfF_f5A`;

const LikeApi = {
  get: () => {
    return requester.get<GetLikeListResponse>(`/user/party/like`);
  },

  post: ({ party_id }: PostLikeParams) => {
    return requester.post(`party/like/${party_id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  },

  delete: ({ party_id }: PostLikeParams) => {
    return requester.delete(`party/like/${party_id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  },
};

const useGetLikeList = () => {
  const queryKey = ['like-list'];

  return useQuery(queryKey, () => LikeApi.get(), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 찜 리스트 조회 실패`),
  });
};

const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (partyId: PostLikeParams['party_id']) =>
      LikeApi.post({ party_id: partyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['like-list']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 찜 등록하기 실패`),
    },
  );
};

const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (partyId: PostLikeParams['party_id']) =>
      LikeApi.delete({ party_id: partyId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['like-list']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 찜 삭제하기 실패`),
    },
  );
};

export { LikeApi, useGetLikeList, usePostLike, useDeleteLike };
