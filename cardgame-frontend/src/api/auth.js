import api from './axios';

export const login = async (email, senha) => {
  const response = await api.post('/auth/login', { email, senha });
  return response.data;
};
