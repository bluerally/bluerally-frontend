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

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTYyNjcxMjV9.BDwNAGTOtpL0WLDmkii4xUdDEccrrMOPOmlKSfF_f5A`;

const headers = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const UserApi = {
  me: () => {
    return requester.get<GetUserMeResponse>(`/user/me`, headers);
  },
  post: (data: PostUserMeRequestBody) => {
    return requester.post<PostUserMeResponse>(`/user/me`, { data }, headers);
  },
  get: (userId: number) => {
    return requester.get<GetUserByIdResponse>(`/user/profile/${userId}`);
  },
  getPartyMeOrganized: () => {
    return requester.get<getPartyMeOrganizationResponse>(
      `/party/me/organized`,
      headers,
    );
  },
  getPartyMeParticipated: () => {
    return requester.get<getPartyMeParticipatedResponse>(
      `/party/me/participated`,
      headers,
    );
  },
  // get: (partyId: GetCommentListRequestPath) => {
  //   return requester.get<GetCommentListResponse>(`/party/${partyId}/comment`);
  // },
};

const useGetUserMe = () => {
  const queryKey = ['userMe'];

  return useQuery(queryKey, () => UserApi.me(), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 내 정보 조회 실패`),
  });
};

const usePostUserMe = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PostUserMeRequestBody) => UserApi.post(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userMe']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 내 정보 수정 실패`),
  });
};

const useGetUserById = (userId: number, isSearch?: boolean) => {
  const queryKey = [`user/profile/${userId}`];

  return useQuery(queryKey, () => UserApi.get(userId), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 유저 정보 조회 실패`),
  });
};

const useGetPartyMeOrganized = (isSearch?: boolean) => {
  const queryKey = ['party/me/organized'];

  return useQuery(queryKey, () => UserApi.getPartyMeOrganized(), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 내가 주최한 모임 조회 실패`),
  });
};

const useGetPartyMeParticipated = (isSearch?: boolean) => {
  const queryKey = ['/party/me/participated'];

  return useQuery(queryKey, () => UserApi.getPartyMeParticipated(), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 내가 참여한 모임 조회 실패`),
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
