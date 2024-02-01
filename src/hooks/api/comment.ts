import {
  DeleteCommentRequest,
  DeleteCommentRequestPath,
  GetCommentListRequestPath,
  GetCommentListResponse,
  PostCommentListResponse,
  PostCommentRequest,
  UpdateCommentRequest,
} from '@/@types/comment/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDY2MTk5NzB9.avmLuGtGYeW8Dfe4-WZRtsk9dz9EVkzRvvQo2-WXOjU`;

const CommentApi = {
  get: (partyId: GetCommentListRequestPath) => {
    return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  post: ({ partyId, content }: PostCommentRequest) => {
    return requester.post<PostCommentListResponse>(
      `/party/${partyId}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  update: ({ partyId, commentId, content }: UpdateCommentRequest) => {
    return requester.post<PostCommentListResponse>(
      `/party/${partyId}/comment/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },
  delete: ({ partyId, commentId }: DeleteCommentRequest) => {
    return requester.delete<PostCommentListResponse>(
      `/party/${partyId}/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
  const queryClient = useQueryClient();

  return useMutation((data: PostCommentRequest) => CommentApi.post(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment-list']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 작성 실패`),
  });
};

const useUpdatePartyComment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: UpdateCommentRequest) => CommentApi.update(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment-list']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 수정 실패`),
  });
};

const useDeletePartyComment = () => {
  const queryClient = useQueryClient();

  return useMutation((data: DeleteCommentRequest) => CommentApi.delete(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment-list']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 코멘트 수정 실패`),
  });
};

export {
  CommentApi,
  useGetPartyCommentList,
  usePostPartyComment,
  useUpdatePartyComment,
  useDeletePartyComment,
};
