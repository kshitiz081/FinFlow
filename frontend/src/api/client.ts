import axios from 'axios';
import { Ticker, StreamMessage } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: any) => {
    console.error(`[API Error]`, error);
    return Promise.reject(error);
  }
);

export const marketApi = {
  getMarketData: async (symbols: string[]) => {
    const response = await apiClient.get('/market/data', {
      params: { symbols: symbols.join(',') },
    });
    return response.data;
  },

  subscribeToStream: (onMessage: (data: StreamMessage) => void): (() => void) => {
    const eventSource = new EventSource(`${API_BASE_URL}/market/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Failed to parse stream message:', error);
      }
    };

    eventSource.onerror = () => {
      console.error('Stream connection error');
      eventSource.close();
    };

    return () => eventSource.close();
  },

  getHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};
