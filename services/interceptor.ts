import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json', Pragma: 'no-cache' },
});

axiosInstance.interceptors.request.use((req) => {
  req.headers = { 'Content-Type': 'application/json' };
  return req;
});
