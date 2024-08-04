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
    const accessToken = localStorage.getItem('access_token');

    if (!config.headers) config.headers = {};
    if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken;

    return config as InternalAxiosRequestConfig;
  },
);

requester.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default requester;
