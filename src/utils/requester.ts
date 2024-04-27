import axios from 'axios';

const TIME_OUT = 1000 * 120;

const requester = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  timeout: TIME_OUT,
  withCredentials: true,
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer' + ' ' + process.env.NEXT_PUBLIC_API_TOKEN,
    // "Authorization": "Bearer" + " " + getToken("token").accessToken
  },
});

requester.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default requester;
