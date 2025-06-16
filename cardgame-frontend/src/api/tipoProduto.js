import api from './api';

const API_URL = '/tipos-produto';

export async function getTiposProduto() {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tipos de produto:', error);
    throw error;
  }
}

export async function createTipoProduto(data) {
  try {
    const response = await api.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tipo de produto:', error);
    throw error;
  }
}

export async function updateTipoProduto(id, data) {
  try {
    const response = await api.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar tipo de produto:', error);
    throw error;
  }
}

export async function deleteTipoProduto(id) {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar tipo de produto:', error);
    throw error;
  }
}
