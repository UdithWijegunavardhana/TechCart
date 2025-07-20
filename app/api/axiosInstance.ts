import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    Accept: 'application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryCondition: isNetworkOrIdempotentRequestError,
});

export const setAuthHeader = (token?: string): void => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const removeAuthHeader = (): void => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

export default axiosInstance;
