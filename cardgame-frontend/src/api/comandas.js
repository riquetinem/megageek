import api from './api';

export async function criarComanda(clienteId) {
  const response = await api.post('/comanda', { cliente_id: clienteId });
  return response.data;
}

export async function buscarComanda(id) {
  const response = await api.get(`/comanda/${id}`);
  return response.data;
}

export async function adicionarItemComanda(comandaId, produtoId, quantidade) {
  const response = await api.post('/item-comanda', {
    comanda_id: comandaId,
    produto_id: produtoId,
    quantidade,
  });
  return response.data;
}

export async function fecharComanda(id) {
  const response = await api.put(`/comanda/${id}/fechar`);
  return response.data;
}

export async function getComandasAbertas() {
  const response = await api.get('/comanda?status=aberta');
  return response.data;
}

export async function getComandas() {
  const response = await api.get('/comanda');
  return response.data;
}