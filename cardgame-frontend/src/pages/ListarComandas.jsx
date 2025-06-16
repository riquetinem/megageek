import { useEffect, useState } from 'react';
import { getComandas } from '../api/comandas';
import { getClientes } from '../api/cliente';
import { getUsuarios } from '../api/user';

export default function ListarComandas() {
  const [comandas, setComandas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    clienteId: '',
    usuarioId: '',
    dataInicio: '',
    dataFim: ''
  });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const [c, u] = await Promise.all([
      getClientes(),
      getUsuarios()
    ]);
    setClientes(c);
    setUsuarios(u);
  }

  async function buscarComandas() {
    const query = new URLSearchParams(filtros).toString();
    const data = await getComandas(query);
    setComandas(data);
  }

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todas as Comandas</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <select name="clienteId" value={filtros.clienteId} onChange={handleChange} className="border p-2">
          <option value="">Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <select name="usuarioId" value={filtros.usuarioId} onChange={handleChange} className="border p-2">
          <option value="">Funcionário</option>
          {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
        </select>

        <input type="date" name="dataInicio" value={filtros.dataInicio} onChange={handleChange} className="border p-2" />
        <input type="date" name="dataFim" value={filtros.dataFim} onChange={handleChange} className="border p-2" />
      </div>

      <button onClick={buscarComandas} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Buscar</button>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Cliente</th>
            <th className="border px-2 py-1">Funcionário</th>
            <th className="border px-2 py-1">Abertura</th>
            <th className="border px-2 py-1">Fechamento</th>
            <th className="border px-2 py-1">Fechada</th>
          </tr>
        </thead>
        <tbody>
          {comandas.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.id}</td>
              <td className="border px-2 py-1">{c.Cliente?.nome || '-'}</td>
              <td className="border px-2 py-1">{c.Usuario?.nome || '-'}</td>
              <td className="border px-2 py-1">{new Date(c.createdAt).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{c.fechada && c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : '-'}</td>
              <td className="border px-2 py-1 text-center">{c.fechada ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
