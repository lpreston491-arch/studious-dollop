import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: (data: any) => api.post('/auth/signup', data),
  login: (data: any) => api.post('/auth/login', data),
};

export const dashboard = {
  get: () => api.get('/dashboard'),
};

export const habits = {
  list: () => api.get('/habits'),
  create: (data: any) => api.post('/habits', data),
  update: (id: string, data: any) => api.put(`/habits/${id}`, data),
  delete: (id: string) => api.delete(`/habits/${id}`),
  toggleCheckin: (id: string) => api.post(`/habits/${id}/checkin`),
  getCheckins: (id: string) => api.get(`/habits/${id}/checkins`),
};

export const subscriptions = {
  createCheckout: (priceId: string) => api.post('/subscriptions/create-checkout', { priceId }),
  getStatus: () => api.get('/subscriptions/status'),
  portal: () => api.post('/subscriptions/portal'),
};

export default api;
