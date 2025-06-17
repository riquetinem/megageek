import { useEffect, useState } from 'react';
import { getComandas } from '../api/comandas';
import { getClientes } from '../api/cliente';
import { getUsuarios } from '../api/user';
import { formatDateToBr } from '../utils/dateFormatter';
import styled from 'styled-components';

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
  background-color: #4e73df;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  grid-column: 1 / -1;
  max-width: 200px;
  margin: 0 auto;
  
  &:hover {
    background-color: #3a5bbf;
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
    <Container>
      <Header>Todas as Comandas</Header>

      <FilterContainer>
        <Select name="clienteId" value={filtros.clienteId} onChange={handleChange}>
          <option value="">Todos os Clientes</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </Select>

        <Select name="usuarioId" value={filtros.usuarioId} onChange={handleChange}>
          <option value="">Todos os Funcionários</option>
          {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
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

        <Button onClick={buscarComandas}>Buscar Comandas</Button>
      </FilterContainer>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Cliente</TableHeaderCell>
            <TableHeaderCell>Funcionário</TableHeaderCell>
            <TableHeaderCell>Abertura</TableHeaderCell>
            <TableHeaderCell>Fechamento</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {comandas.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.Cliente?.nome || '-'}</TableCell>
              <TableCell>{c.Usuario?.nome || '-'}</TableCell>
              <TableCell>{formatDateToBr(c.data_abertura)}</TableCell>
              <TableCell>{c.status == 'fechada' ? formatDateToBr(c.data_fechamento) : '-'}</TableCell>
              <TableCell>
                <StatusBadge className={c.status == 'fechada' ? 'closed' : 'open'}>
                  {c.status	== 'fechada' ? 'Fechada' : 'Aberta'}
                </StatusBadge>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}