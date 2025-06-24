import api from './api';

export async function criarComanda(clienteId) {
  const response = await api.post('/comanda', { cliente_id: clienteId });
  return response.data;
}

export async function buscarComanda(id) {
  const response = await api.get(`/comanda/${id}`);
  return response.data;
}

export async function adicionarItemComanda(comandaId, produtoId, quantidade, user, precoUnitario) {
  const response = await api.post('/item-comanda', {
    comanda_id: comandaId,
    produto_id: produtoId,
    quantidade,
    user,
    precoUnitario
  });
  return response.data;
}

export async function fecharComanda(id) {
  const token = localStorage.getItem('token'); // ou onde quer que você armazene

  const response = await api.put(`/comanda/${id}/fechar`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

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

export async function removerItemComanda(itemId) {
  const response = await api.delete(`/item-comanda/${itemId}`);
  return response.data;
}

export const atualizarQuantidadeItem = async (itemId, quantidade) => {
  const novaQuantidade = Number(quantidade);
  if (isNaN(novaQuantidade)) {
    throw new Error('Quantidade inválida');
  }

  const response = await api.put(`/item-comanda/${itemId}/quantidade`, {
    novaQuantidade: novaQuantidade
  });
  return response.data;
};