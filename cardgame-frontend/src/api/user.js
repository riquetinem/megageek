import api from './api';

export const getCurrentUser = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export const updateUser = async (updates) => {
  const response = await api.put('/user/me', updates);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await api.get('/user');
  return response.data;
};

export async function cadastrarUsuario({ nome, email, senha, role }) {
  const response = await api.post('/user', { nome, email, senha, role });
  return response.data;
}