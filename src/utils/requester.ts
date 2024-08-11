import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AuthApi, usePostAuthRefreshToken } from '@/hooks/api/auth';

const TIME_OUT = 1000 * 120;

const requester = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  timeout: TIME_OUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

requester.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('access_token');

    if (!config.headers) {
      config.headers = {};
    }

    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config as InternalAxiosRequestConfig;
  },
);

requester.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const { data } = await AuthApi.postAuthRefreshToken({
          refresh_token: refreshToken,
        });
        localStorage.setItem('access_token', data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return requester(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default requester;
