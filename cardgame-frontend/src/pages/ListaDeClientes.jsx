import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '@/api/cliente';
import { useNavigate } from 'react-router-dom';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const carregarClientes = async () => {
    setCarregando(true);
    try {
      const data = await getClientes(filtro);
      setClientes(data);
    } catch (err) {
      alert('Erro ao carregar clientes', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleRemover = async (id) => {
    if (!confirm('Deseja realmente remover este cliente?')) return;
    try {
      await deleteCliente(id);
      carregarClientes();
    } catch (err) {
      alert('Erro ao remover cliente', err);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="border px-2 py-1 rounded"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate('/clientes/novo')}
        >
          Novo Cliente
        </button>
      </div>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Nome</th>
              <th className="border px-2 py-1">Contato</th>
              <th className="border px-2 py-1">Criado por</th>
              <th className="border px-2 py-1">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-2 py-1">{cliente.id}</td>
                <td className="border px-2 py-1">{cliente.nome}</td>
                <td className="border px-2 py-1">{cliente.contato}</td>
                <td className="border px-2 py-1">{cliente.cadastrado_por_usuario?.nome || '-'}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemover(cliente.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
