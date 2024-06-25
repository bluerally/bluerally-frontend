import requester from '@/utils/requester';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetRedirectionUrl,
  GetAuthPlatform,
  PostAuthToken,
  PostAuthRefreshToken,
  PostLogout,
} from '@/@types/auth/type';

import { components } from '@/@types/backend';

const BASE_URL = '/user/auth';

const token = process.env.NEXT_PUBLIC_ORGANIZER_TOKEN;

const AuthApi = {
  getRedirectionUrl: (parameter: {
    platform: 'google' | 'kakao' | 'naver';
  }) => {
    return requester.get<GetRedirectionUrl>(
      `${BASE_URL}/redirect-url/${parameter.platform}`,
    );
  },
  getAuthPlatform: (platform: 'google' | 'kakao' | 'naver') => {
    return requester.get<GetAuthPlatform>(
      `${BASE_URL}/redirect-url/${platform}`,
    );
  },
  postAuthToken: (parameter: { user_uid: string }) => {
    return requester.post(`${BASE_URL}/token`, parameter);
  },
  postAuthRefreshToken: (parameter: { refresh_token: string }) => {
    return requester.post(`${BASE_URL}/token/refresh`, parameter, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getLogout: () => {
    return requester.post(`${BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// const useGetRedirectionUrl = (platform: 'google' | 'kakao' | 'naver') => {
const useGetRedirectionUrl = () => {
  // const queryKey = ['redirect-url'];

  // return useQuery(queryKey, () => AuthApi.getRedirectionUrl(platform), {
  //   onError: (error: AxiosError<any>) =>
  //     window.alert(`${error.code} 로그인 실패`),
  //   enabled: !!platform,
  // });
  const queryClient = useQueryClient();
  return useMutation(
    (data: GetRedirectionUrl) => AuthApi.getRedirectionUrl(data),
    {
      onSuccess: (data) => {
        window.open(data.data?.redirect_url, '_blank', 'noopener, noreferrer');
        queryClient.invalidateQueries(['auth-token']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 상태 변경 실패`),
    },
  );
};
/** Auth.tsx */
// const useGetAuthPlatform = (platform: 'google' | 'kakao' | 'naver') => {
const useGetAuthPlatform = () => {
  // const queryKey = ['auth-platform'];

  // return useQuery(queryKey, () => AuthApi.getAuthPlatform(platform), {
  //   onError: (error: AxiosError<any>) =>
  //     window.alert(`${error.code} 토큰값 취득`),
  // });
  const queryClient = useQueryClient();
  return useMutation(
    (data: GetRedirectionUrl) => AuthApi.getAuthPlatform(data.platform),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth-platform']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 상태 변경 실패`),
    },
  );
};

const usePostAuthToken = () => {
  const queryClient = useQueryClient();
  return useMutation((data: PostAuthToken) => AuthApi.postAuthToken(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['auth-token']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 상태 변경 실패`),
  });
};
const usePostAuthRefreshToken = () => {
  // const queryClient = useQueryClient();
  // return useMutation(
  //   (data: PostAuthRefreshToken) => AuthApi.postAuthToken(data),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['auth-token']);
  //     },
  //     onError: (error: AxiosError<any>) =>
  //       window.alert(`${error.code} 파티 상태 변경 실패`),
  //   },
  // );
};
const usePostLogout = () => {};

export {
  AuthApi,
  useGetRedirectionUrl,
  useGetAuthPlatform,
  usePostAuthToken,
  usePostAuthRefreshToken,
  usePostLogout,
};
