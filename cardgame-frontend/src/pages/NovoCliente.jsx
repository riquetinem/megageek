import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient, getClientById, updateClient } from '../../api/client';

export default function ClienteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getClientById(id)
        .then(data => {
          setNome(data.nome);
          setContato(data.contato);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateClient(id, { nome, contato });
      } else {
        await createClient({ nome, contato });
      }
      navigate('/clientes');
    } catch (err) {
      alert('Erro ao salvar cliente', err);
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
          <label className="block text-sm font-medium">Contato</label>
          <input
            type="text"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
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
