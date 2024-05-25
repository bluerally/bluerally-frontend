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

const TOKEN = process.env.NEXT_PUBLIC_ORGANIZER_TOKEN;

const CommentApi = {
  get: (partyId: GetCommentListRequestPath) => {
    return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`);
  },

  post: ({ partyId, content }: PostCommentRequest) => {
    return requester.post<PostCommentListResponse>(
      `/party/${partyId}/comment`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  },

  update: ({ partyId, commentId, content }: UpdateCommentRequest) => {
    return requester.put<PostCommentListResponse>(
      `/party/${partyId}/comment/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  },
  delete: ({ partyId, commentId }: DeleteCommentRequest) => {
    return requester.delete<PostCommentListResponse>(
      `/party/${partyId}/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  },
};

const useGetPartyCommentList = (
  partId?: GetCommentListRequestPath,
  isSearch?: boolean,
) => {
  const queryKey = ['comment-list', partId];

  return useQuery(queryKey, () => CommentApi.get(partId ?? 1), {
    enabled: isSearch,
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
