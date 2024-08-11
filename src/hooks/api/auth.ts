import requester from '@/utils/requester';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetRedirectionUrlParam,
  GetAuthPlatform,
  GetRedirectionUrlResponse,
  PostAuthToken,
} from '@/@types/auth/type';
import Cookies from 'js-cookie';

import { useNavigate } from '@/hooks/useNavigate';

const BASE_URL = '/user/auth';

const token = process.env.NEXT_PUBLIC_ORGANIZER_TOKEN;

const AuthApi = {
  getRedirectionUrl: (parameter: GetRedirectionUrlParam) => {
    return requester.get<GetRedirectionUrlResponse>(
      `${BASE_URL}/redirect-url/${parameter.platform}`,
    );
  },
  getAuthPlatform: (platform: GetAuthPlatform) => {
    return requester.get<GetAuthPlatform>(`${BASE_URL}/${platform}`);
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

const useGetRedirectionUrl = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ platform }: GetRedirectionUrlParam) =>
      AuthApi.getRedirectionUrl({ platform }),
    {
      onSuccess: (data) => {
        window.location.href = data.data.redirect_url;
        queryClient.invalidateQueries(['auth-token']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 로그인 실패`),
    },
  );
};

/** Auth.tsx */
const useGetAuthPlatform = ({ platform }: GetRedirectionUrlParam) => {
  const queryKey = ['auth-platform'];

  return useQuery(queryKey, () => AuthApi.getAuthPlatform(platform), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 토큰값 취득`),
  });
};

/** 로그인 토큰 취득 */
const usePostAuthToken = () => {
  const queryClient = useQueryClient();
  const { pushToRoute } = useNavigate();

  return useMutation((data: PostAuthToken) => AuthApi.postAuthToken(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['auth-token']);
      Cookies.set('accessToken', data.data.access_token);
      Cookies.set('refreshToken', data.data.refresh_token);

      pushToRoute(`/`);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 로그인 토근 발급 실패`),
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
