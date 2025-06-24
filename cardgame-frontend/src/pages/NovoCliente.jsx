import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient, getClientById, updateClient } from '../../api/client';
import { useAuth } from '../auth/AuthContext';

export default function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getClientById(id)
        .then(data => {
          setNome(data.nome);
          setTelefone(data.telefone);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { nome, telefone, user };
      console.log('Payload sendo enviado:', payload); // 👈 adicione isso
      if (id) {
        await updateClient(id, { nome, telefone });
      } else {
        await createClient({ nome, telefone, user });
      }
      navigate('/clientes');
    } catch (err) {
      alert('Erro ao salvar cliente');
      console.error(err);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Cliente' : 'Novo Cliente'}</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
