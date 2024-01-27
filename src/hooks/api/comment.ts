import {
  GetCommentListRequestPath,
  GetCommentListResponse,
  PostCommentListResponse,
  PostCommentRequest,
} from '@/@types/comment/type';
import requester from '@/utils/requester';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const CommentApi = {
  get: (partyId: GetCommentListRequestPath) => {
    return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`);
  },

  post: ({ partyId, content }: PostCommentRequest) => {
    return requester.post<PostCommentListResponse>(
      `/party/${partyId}/comment`,
      { content },
    );
  },
};

const useGetPartyCommentList = (partId?: GetCommentListRequestPath) => {
  const queryKey = ['comment-list', partId];

  return useQuery(queryKey, () => CommentApi.get(partId ?? 1), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 리스트 조회 실패`),
  });
};

const usePostPartyComment = () => {
  return useMutation((data: PostCommentRequest) => CommentApi.post(data), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 작성 실패`),
  });
};

export { CommentApi, useGetPartyCommentList, usePostPartyComment };
