import { ACCESS_TOKEN_KEY } from '@/constants/common';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const TIME_OUT = 1000 * 120;

const requester = axios.create({
  baseURL: 'https://bluerally.net/api',
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
