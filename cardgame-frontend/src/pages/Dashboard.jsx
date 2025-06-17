import { useEffect, useState } from 'react';
import { getComandasAbertas } from '../api/comandas';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [comandas, setComandas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchComandas() {
      try {
        const data = await getComandasAbertas();
        setComandas(data);
      } catch (err) {
        console.error('Erro ao buscar comandas:', err);
      }
    }
    fetchComandas();
  }, []);

  const handleIrParaComanda = (id) => {
    navigate(`/comandas/${id}`);
  };

  const handleAbrirNovaComanda = () => {
    navigate('/nova-comanda');
  };

  return (
    <div className="container">
      <h1>Comandas em Aberto</h1>
      <button onClick={handleAbrirNovaComanda}>Abrir Nova Comanda</button>
      
      <div className="comanda-card">
        {comandas.map((comanda) => (
          <div key={comanda.id}>
            <strong>Cliente:</strong> {comanda.Cliente?.nome || 'Sem cliente'}<br />
            <strong>Funcionário:</strong> {comanda.abertoPor?.nome}<br />
            <strong>Data de Abertura:</strong> {new Date(comanda.createdAt).toLocaleString()}<br />
            <button onClick={() => handleIrParaComanda(comanda.id)}>Ir para Comanda</button>
          </div>
        ))}
      </div>
    </div>
  );
}