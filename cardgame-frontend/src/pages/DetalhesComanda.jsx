import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarComanda, adicionarItemComanda, fecharComanda } from '../api/comandas';
import api from '../api/api';

export default function DetalhesComanda() {
  const { id } = useParams();
  const [comanda, setComanda] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const carregarDados = async () => {
    const c = await buscarComanda(id);
    setComanda(c);
  };

  useEffect(() => {
    carregarDados();
    api.get('/product').then(res => setProdutos(res.data));
  }, []);

  const handleAdicionarItem = async () => {
    if (!produtoSelecionado || quantidade <= 0) {
      alert('Escolha um produto e uma quantidade válida');
      return;
    }

    await adicionarItemComanda(comanda.id, produtoSelecionado, quantidade);
    setProdutoSelecionado('');
    setQuantidade(1);
    await carregarDados(); // recarrega a comanda com os novos itens
  };

    const handleFecharComanda = async () => {
        try {
            await fecharComanda(comanda.id);
            await carregarDados();
            alert('Comanda fechada com sucesso!');
        } catch (err) {
            alert('Erro ao fechar comanda', err);
        }
    };

  

  if (!comanda) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Comanda #{comanda.id}</h1>
      <p><strong>Cliente:</strong> {comanda.cliente?.nome}</p>
      <p><strong>Status:</strong> {comanda.fechada ? 'Fechada' : 'Aberta'}</p>
      <p><strong>Data de Abertura:</strong> {new Date(comanda.createdAt).toLocaleString()}</p>

      {!comanda.fechada && (
        <button
            onClick={handleFecharComanda}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
        >
            Fechar Comanda
        </button>
    )}

      <hr className="my-4" />

      <h2 className="text-lg font-semibold mb-2">Itens da Comanda</h2>
      <ul className="mb-4">
        {comanda.itens.map(item => (
          <li key={item.id}>
            {item.produto?.nome} - {item.quantidade}x
          </li>
        ))}
      </ul>

    {!comanda.fechada && (
        <>
            <h2 className="text-lg font-semibold mb-2">Adicionar Item</h2>
            <div className="flex gap-2 mb-2">
                <select
                value={produtoSelecionado}
                onChange={(e) => setProdutoSelecionado(e.target.value)}
                className="border p-2"
                >
                <option value="">Selecione um produto</option>
                {produtos.map(p => (
                    <option key={p.id} value={p.id}>
                    {p.nome} - R$ {p.preco_padrao.toFixed(2)}
                    </option>
                ))}
                </select>
                <input
                type="number"
                className="border p-2 w-20"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                />
                <button
                onClick={handleAdicionarItem}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                Adicionar
                </button>
            </div>
        </>
    )}

    </div>
  );
}
