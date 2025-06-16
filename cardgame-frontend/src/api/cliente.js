import api from './api';

export const getClientes = async (filtro = '') => {
  const response = await api.get(`/cliente?nome=${filtro}`);
  return response.data;
};

export const getClienteById = async (id) => {
  const response = await api.get(`/cliente/${id}`);
  return response.data;
};

export const createCliente = async (dados) => {
  const response = await api.post('/cliente', dados);
  return response.data;
};

export const updateCliente = async (id, dados) => {
  const response = await api.put(`/cliente/${id}`, dados);
  return response.data;
};

export const deleteCliente = async (id) => {
  const response = await api.delete(`/cliente/${id}`);
  return response.data;
};
