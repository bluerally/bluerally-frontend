import {
  GetUserByIdResponse,
  GetUserMeResponse,
  PostUserMeRequestBody,
  PostUserMeResponse,
  getPartyMeOrganizationResponse,
  getPartyMeParticipatedResponse,
} from '@/@types/user/type';
import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'bluerally-design-system';

const UserApi = {
  me: () => {
    return requester.get<GetUserMeResponse>(`/user/me`);
  },
  post: (data: PostUserMeRequestBody) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const multiFormDataHeaders = {
      'Content-Type': 'multipart/form-data',
    };

    return requester.post<PostUserMeResponse>('/user/me', formData, {
      headers: multiFormDataHeaders,
    });
  },

  get: (userId?: number) => {
    return requester.get<GetUserByIdResponse>(`/user/profile/${userId}`);
  },
  getPartyMeOrganized: () => {
    return requester.get<getPartyMeOrganizationResponse>(`/party/me/organized`);
  },
  getPartyMeParticipated: () => {
    return requester.get<getPartyMeParticipatedResponse>(
      `/party/me/participated`,
    );
  },
  // get: (partyId: GetCommentListRequestPath) => {
  //   return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`);
  // },
};

const useGetUserMe = (enabled?: boolean) => {
  const queryKey = ['userMe'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => UserApi.me(), {
    enabled,
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 내 정보 조회 실패` }),
  });
};

const usePostUserMe = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation((data: PostUserMeRequestBody) => UserApi.post(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userMe']);
    },
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 내 정보 수정 실패` }),
  });
};

const useGetUserById = (userId?: number, isSearch?: boolean) => {
  const queryKey = [`user/profile/${userId}`];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => UserApi.get(userId), {
    enabled: !!userId && isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 유저 정보 조회 실패` }),
  });
};

const useGetPartyMeOrganized = (isSearch?: boolean) => {
  const queryKey = ['party/me/organized'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => UserApi.getPartyMeOrganized(), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 내가 주최한 모임 조회 실패` }),
  });
};

const useGetPartyMeParticipated = (isSearch?: boolean) => {
  const queryKey = ['/party/me/participated'];
  const snackbar = useSnackbar();

  return useQuery(queryKey, () => UserApi.getPartyMeParticipated(), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 내가 참여한 모임 조회 실패` }),
  });
};

export {
  UserApi,
  useGetUserMe,
  usePostUserMe,
  useGetUserById,
  useGetPartyMeOrganized,
  useGetPartyMeParticipated,
};
