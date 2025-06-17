import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

export default function ProdutosPage() {
  const { token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    preco_padrao: '',
    tipo_produto_id: '',
    estoque: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    carregarProdutos();
    carregarTipos();
  }, []);

  const carregarProdutos = async () => {
    const res = await api.get('/product');
    setProdutos(res.data);
  };

  const carregarTipos = async () => {
    const res = await api.get('/tipo-produto');
    setTipos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        estoque: parseInt(form.estoque) || 0
      };
      if (editandoId) {
        await api.put(`/product/${editandoId}`, payload);
      } else {
        await api.post('/product', payload);
      }
      setForm({ nome: '', preco_padrao: '', tipo_produto_id: '', estoque: '' });
      setEditandoId(null);
      carregarProdutos();
    } catch (err) {
      alert('Erro ao salvar produto', err);
    }
  };

  const editar = (produto) => {
    setForm({
      nome: produto.nome,
      preco_padrao: produto.preco_padrao,
      tipo_produto_id: produto.tipo_produto_id,
      estoque: produto.estoque
    });
    setEditandoId(produto.id);
  };

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      await api.delete(`/product/${id}`);
      carregarProdutos();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Produtos</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Preço Padrão"
          value={form.preco_padrao}
          onChange={(e) => setForm({ ...form, preco_padrao: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={form.estoque}
          onChange={(e) => setForm({ ...form, estoque: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <select
          value={form.tipo_produto_id}
          onChange={(e) => setForm({ ...form, tipo_produto_id: e.target.value })}
          className="border p-2 w-full"
          required
        >
          <option value="">Selecione o tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editandoId ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">Estoque</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.nome}</td>
              <td className="border p-2">R$ {p.preco_padrao}</td>
              <td className="border p-2">{p.estoque}</td>
              <td className="border p-2">{p.TipoProduto?.nome}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => editar(p)}
                  className="px-2 py-1 bg-yellow-500 text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(p.id)}
                  className="px-2 py-1 bg-red-600 text-white"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
