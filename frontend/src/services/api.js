import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getModels = () => api.get('/models');
export const getHistory = () => api.get('/history');

export const predict = (modelKey, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post(`/predict/${modelKey}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;
