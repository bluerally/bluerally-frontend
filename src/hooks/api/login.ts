import requester from '@/utils/requester';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const LoginApi = {
  getDirectUrl: (platform: string) => {
    return requester.get<any>(`user/auth/redirect-url/${platform}`);
  },
  getToken: (params: any) => {
    return requester.post<any>(`user/auth/token`, params);
  },
};

const useGetDirectUrl = (platform: string) => {
  const queryKey = ['redirect-url', platform];

  return useQuery(queryKey, () => LoginApi.getDirectUrl(platform), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 소셜 로그인 url 취득 실패`),
  });
};

const useGetToken = (params: any) => {
  const queryKey = ['token', params];

  return useQuery(queryKey, () => LoginApi.getToken(params), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 토큰 취득 실패`),
  });
};

export { LoginApi, useGetDirectUrl, useGetToken };
