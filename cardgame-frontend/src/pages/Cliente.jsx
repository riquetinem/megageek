import { useEffect, useState } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/cliente';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState('');

  const carregarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cliente = { nome, email, telefone };
    if (editando) {
      await updateCliente(editando.id, cliente);
      setEditando(null);
    } else {
      await createCliente(cliente);
    }
    setNome('');
    setEmail('');
    setTelefone('');
    carregarClientes();
  };

  const handleEditar = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditando(cliente);
  };

  const handleDeletar = async (id) => {
    await deleteCliente(id);
    carregarClientes();
  };

  const clientesFiltrados = clientes.filter((c) => c.nome.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gerenciar Clientes</h1>

      <input
        type="text"
        placeholder="Filtrar por nome"
        className="border px-2 py-1 mb-4"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Nome"
          className="border px-2 py-1 w-full"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-2 py-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          className="border px-2 py-1 w-full"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editando ? 'Salvar Alterações' : 'Cadastrar Cliente'}
        </button>
      </form>

      <ul className="space-y-2">
        {clientesFiltrados.map((cliente) => (
          <li key={cliente.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <strong>{cliente.nome}</strong><br />
              <span>{cliente.email}</span><br />
              <span>{cliente.telefone}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditar(cliente)}
                className="bg-yellow-400 px-2 py-1 rounded text-white"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeletar(cliente.id)}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
