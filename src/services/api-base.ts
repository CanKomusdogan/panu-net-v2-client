import axios from 'axios';

import { API_CONFIG } from '@/config/api.ts';
import emitter from '@/services/serviceBus.ts';

const myAxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

myAxiosInstance.interceptors.response.use(
  response => {
    if (response.headers['x-cache-status'] === 'HIT') {
      const ttlHeader = response.headers['x-cache-ttl'];
      const ttlSeconds = ttlHeader ? Number(ttlHeader) : null;

      console.log('Cache hit', { ttlSeconds });
      emitter.emit('cacheHit', ttlSeconds);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default myAxiosInstance;

export const apiTest = () => {
  return myAxiosInstance.get('/test');
};

export const cleanPayload = <T extends Record<string, unknown>>(payload: T) => {
  return Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== ''));
};
