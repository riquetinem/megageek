import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste para o seu backend
});

// Interceptador para adicionar token a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
