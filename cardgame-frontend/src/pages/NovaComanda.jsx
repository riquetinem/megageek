import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarComanda } from '../api/comandas';
import api from '../api/api';

export default function NovaComanda() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await api.get('/cliente');
      setClientes(response.data);
    };
    fetchClientes();
  }, []);

  const handleCriarComanda = async () => {
    if (!clienteSelecionado) {
      alert('Selecione um cliente');
      return;
    }

    try {
      const novaComanda = await criarComanda(clienteSelecionado.id);
      navigate(`/comandas/${novaComanda.id}`);
    } catch (err) {
      alert('Erro ao criar comanda', err);
    }
  };

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Abrir Nova Comanda</h1>

      <input
        type="text"
        placeholder="Buscar cliente por nome ou e-mail"
        className="border p-2 w-full mb-4"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <ul className="space-y-2 mb-4">
        {clientesFiltrados.map(cliente => (
          <li
            key={cliente.id}
            onClick={() => setClienteSelecionado(cliente)}
            className={`p-2 border rounded cursor-pointer ${clienteSelecionado?.id === cliente.id ? 'bg-blue-100' : ''}`}
          >
            {cliente.nome} - {cliente.telefone}
          </li>
        ))}
      </ul>

      {clienteSelecionado && (
        <div className="mb-4">
          <p><strong>Selecionado:</strong> {clienteSelecionado.nome} - {clienteSelecionado.telefone}</p>
        </div>
      )}

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleCriarComanda}
      >
        Abrir Comanda
      </button>
    </div>
  );
}
