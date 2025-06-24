import { useEffect, useState } from 'react';
import { getComandasAbertas } from '../api/comandas';
import { useNavigate } from 'react-router-dom';
import { formatDateToBr } from '../utils/dateFormatter';

export default function Dashboard() {
  const [comandas, setComandas] = useState([]);
  const [filtro, setFiltro] = useState('');
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

  // Filtra as comandas pelo nome do cliente ou do funcionário
  const comandasFiltradas = comandas.filter(comanda => {
    const termoBusca = filtro.toLowerCase();
    const nomeCliente = comanda.Cliente?.nome?.toLowerCase() || '';
    const nomeFuncionario = comanda.abertoPor?.nome?.toLowerCase() || '';
    
    return nomeCliente.includes(termoBusca) || 
           nomeFuncionario.includes(termoBusca);
  });

  return (
    <div className="container">
      <h1>Comandas em Aberto</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por cliente ou funcionário"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: 1
          }}
        />
        <button 
          onClick={handleAbrirNovaComanda}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Abrir Nova Comanda
        </button>
      </div>
      
      <div className="comanda-card" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {comandasFiltradas.map((comanda) => (
          <div 
            key={comanda.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>Cliente:</strong> {comanda.Cliente?.nome || 'Sem cliente'}</p>
            <p><strong>Funcionário:</strong> {comanda.abertoPor?.nome || '-'}</p>
            <p><strong>Data de Abertura:</strong> {formatDateToBr(comanda.createdAt)}</p>
            <button 
              onClick={() => handleIrParaComanda(comanda.id)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Ir para Comanda
            </button>
          </div>
        ))}
      </div>

      {comandasFiltradas.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          {filtro ? 'Nenhuma comanda encontrada' : 'Nenhuma comanda em aberto'}
        </p>
      )}
    </div>
  );
}