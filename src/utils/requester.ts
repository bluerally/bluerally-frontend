import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '@/constants/common';

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
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!config.headers) {
      config.headers = {};
    }

    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config as InternalAxiosRequestConfig;
  },
);

export default requester;
