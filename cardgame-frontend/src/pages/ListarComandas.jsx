import { useEffect, useState } from 'react';
import { getComandasDoDia, getComandasFiltradas } from '../api/comandas';
import { getClientes } from '../api/cliente';
import { getUsuarios } from '../api/user';
import { formatDateToBr } from '../utils/dateFormatter';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Componentes estilizados
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background-color: white;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.$active ? '#2c3e50' : '#4e73df'};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.$active ? '#1a252f' : '#3a5bbf'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.thead`
  background-color: #4e73df;
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  
  &.open {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.closed {
    background-color: #f8d7da;
    color: #721c24;
  }
`;

const TotalContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: right;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ResetButton = styled(Button)`
  background-color: #6c757d;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  grid-column: 1 / -1;
  margin-bottom: 1rem;
`;

export default function ListarComandas() {
  const [comandas, setComandas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    clienteId: '',
    usuarioId: '',
    dataInicio: '',
    dataFim: '',
    status: ''
  });
  const [loading, setLoading] = useState(false);
  const [modoFiltro, setModoFiltro] = useState('hoje');

  const navigate = useNavigate();

   const handleClickComanda = (comandaId) => {
    navigate(`/comandas/${comandaId}`);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);
      const [c, u] = await Promise.all([
        getClientes(),
        getUsuarios()
      ]);
      setClientes(c);
      setUsuarios(u);
      await buscarComandasDoDia();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function buscarComandasDoDia() {
    try {
      setLoading(true);
      setModoFiltro('hoje');
      const data = await getComandasDoDia();
      setComandas(data);
    } catch (error) {
      console.error('Erro ao buscar comandas do dia:', error);
    } finally {
      setLoading(false);
    }
  }

  async function buscarComandasFiltradas() {
    try {
      setLoading(true);
      setModoFiltro('filtro');
      
      const params = {
        cliente_id: filtros.clienteId,
        usuario_id: filtros.usuarioId,
        status: filtros.status,
        data_inicio: filtros.dataInicio,
        data_fim: filtros.dataFim
      };

      const data = await getComandasFiltradas(params);
      setComandas(data);
    } catch (error) {
      console.error('Erro ao buscar comandas filtradas:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetarFiltros = () => {
    setFiltros({
      clienteId: '',
      usuarioId: '',
      dataInicio: '',
      dataFim: '',
      status: ''
    });
  };

  const formatarValor = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
      return 'R$ 0.00';
    }
    return `R$ ${Number(valor).toFixed(2)}`;
  };

  const valorTotal = comandas.reduce((total, comanda) => {
    return total + (Number(comanda.valor_total) || 0);
  }, 0);

  return (
    <Container>
      <Header>Todas as Comandas</Header>

      <ButtonContainer>
        <Button 
          onClick={buscarComandasDoDia} 
          disabled={loading}
          $active={modoFiltro === 'hoje'}
        >
          Comandas do Dia
        </Button>
        <Button 
          onClick={() => setModoFiltro('filtro')} 
          disabled={loading}
          $active={modoFiltro === 'filtro'}
        >
          Filtrar Comandas
        </Button>
      </ButtonContainer>

      {modoFiltro === 'filtro' && (
        <FilterContainer>
          <Select name="clienteId" value={filtros.clienteId} onChange={handleChange}>
            <option value="">Todos os Clientes</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </Select>

          <Select name="usuarioId" value={filtros.usuarioId} onChange={handleChange}>
            <option value="">Todos os Funcionários</option>
            {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
          </Select>

          <Select name="status" value={filtros.status} onChange={handleChange}>
            <option value="">Todos os Status</option>
            <option value="aberta">Aberta</option>
            <option value="fechada">Fechada</option>
          </Select>

          <Input 
            type="date" 
            name="dataInicio" 
            value={filtros.dataInicio} 
            onChange={handleChange} 
            placeholder="Data inicial"
          />
          
          <Input 
            type="date" 
            name="dataFim" 
            value={filtros.dataFim} 
            onChange={handleChange} 
            placeholder="Data final"
          />

          <ButtonContainer>
            <Button onClick={buscarComandasFiltradas} disabled={loading}>
              {loading ? 'Buscando...' : 'Aplicar Filtros'}
            </Button>
            <ResetButton onClick={resetarFiltros} disabled={loading}>
              Limpar Filtros
            </ResetButton>
          </ButtonContainer>
        </FilterContainer>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Cliente</TableHeaderCell>
                <TableHeaderCell>Funcionário</TableHeaderCell>
                <TableHeaderCell>Valor Total</TableHeaderCell>
                <TableHeaderCell>Abertura</TableHeaderCell>
                <TableHeaderCell>Fechamento</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {comandas.length > 0 ? (
                comandas.map(c => (
                  <TableRow 
                    key={c.id}
                    onClick={() => handleClickComanda(c.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.Cliente?.nome || '-'}</TableCell>
                    <TableCell>{c.abertoPor?.nome || '-'}</TableCell>
                    <TableCell>{formatarValor(c.valor_total)}</TableCell>
                    <TableCell>{formatDateToBr(c.data_abertura)}</TableCell>
                    <TableCell>{c.status === 'fechada' ? formatDateToBr(c.data_fechamento) : '-'}</TableCell>
                    <TableCell>
                      <StatusBadge className={c.status === 'fechada' ? 'closed' : 'open'}>
                        {c.status === 'fechada' ? 'Fechada' : 'Aberta'}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="7" style={{ textAlign: 'center' }}>
                    Nenhuma comanda encontrada
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>

          {comandas.length > 0 && (
            <TotalContainer>
              Valor Total das Comandas Listadas: {formatarValor(valorTotal)}
            </TotalContainer>
          )}
        </>
      )}
    </Container>
  );
}