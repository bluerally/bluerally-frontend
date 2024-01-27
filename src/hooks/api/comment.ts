import {
  GetCommentListRequestPath,
  GetCommentListResponse,
  PostCommentListRequestPath,
  PostCommentListResponse,
} from '@/@types/comment/type';
import requester from '@/utils/requester';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const CommentApi = {
  get: (partyId: GetCommentListRequestPath) => {
    return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`);
  },

  post: (partyId?: PostCommentListRequestPath) => {
    return requester.post<PostCommentListResponse>(`/party/${partyId}/comment`);
  },
};

const useGetPartyCommentList = (partId?: GetCommentListRequestPath) => {
  const queryKey = ['comment-list', partId];

  return useQuery(queryKey, () => CommentApi.get(partId ?? 1), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 리스트 조회 실패`),
  });
};

export { CommentApi, useGetPartyCommentList };
