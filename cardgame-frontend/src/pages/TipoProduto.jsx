import { useEffect, useState } from 'react';
import { getTiposProduto, createTipoProduto, updateTipoProduto, deleteTipoProduto } from '../api/tipoProduto';

export default function TipoProdutoPage() {
  const [tipos, setTipos] = useState([]);
  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState(null);

  const fetchTipos = async () => {
    const data = await getTiposProduto();
    setTipos(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await updateTipoProduto(editando.id, { nome });
    } else {
      await createTipoProduto({ nome });
    }
    setNome('');
    setEditando(null);
    fetchTipos();
  };

  const handleEdit = (tipo) => {
    setNome(tipo.nome);
    setEditando(tipo);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este tipo de produto?')) {
      await deleteTipoProduto(id);
      fetchTipos();
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tipos de Produto</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do tipo"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editando ? 'Atualizar' : 'Cadastrar'}
        </button>
        {editando && (
          <button
            type="button"
            className="ml-2 text-sm text-red-500"
            onClick={() => {
              setNome('');
              setEditando(null);
            }}
          >
            Cancelar edição
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tipos.map((tipo) => (
          <div key={tipo.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{tipo.nome}</h3>
            <div className="mt-2">
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEdit(tipo)}
              >
                Editar
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(tipo.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
