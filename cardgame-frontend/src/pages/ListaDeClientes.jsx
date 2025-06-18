import { useEffect, useState } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/cliente';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';

// Componentes estilizados
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const FormContainer = styled.form`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 120px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4e73df;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #4e73df;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #3a5bbf;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;

const ClientList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ClientItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ClientInfo = styled.div`
  flex: 1;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  span {
    display: block;
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #f6c23e;
  color: #1a1a1a;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #dda20a;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #e74a3b;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #be2617;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export default function Clientes() {
  const { user } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregarClientes = async () => {
    setCarregando(true);
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cliente = { nome, email, telefone, user };
      if (editando) {
        await updateCliente(editando.id, cliente);
        setEditando(null);
      } else {
        await createCliente(cliente);
      }
      setNome('');
      setEmail('');
      setTelefone('');
      await carregarClientes();
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
      alert('Erro ao salvar cliente');
    }
  };

  const handleEditar = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEditando(cliente);
  };

  const handleDeletar = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      await deleteCliente(id);
      await carregarClientes();
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      alert('Erro ao excluir cliente');
    }
  };

  const clientesFiltrados = clientes.filter((c) => 
    c.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(filtro.toLowerCase())) ||
    (c.telefone && c.telefone.includes(filtro))
  );

  return (
    <Container>
      <Title>Gerenciar Clientes</Title>

      <FormContainer onSubmit={handleSubmit}>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <SubmitButton type="submit">
            {editando ? 'Salvar' : 'Cadastrar'}
          </SubmitButton>
          {editando && (
            <button
              type="button"
              onClick={() => {
                setEditando(null);
                setNome('');
                setEmail('');
                setTelefone('');
              }}
              style={{
                padding: '0.8rem 1.5rem',
                background: 'transparent',
                border: '1px solid #6c757d',
                borderRadius: '4px',
                color: '#6c757d',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Cancelar
            </button>
          )}
        </FormRow>
      </FormContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Pesquisar clientes por nome, email ou telefone"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </SearchContainer>

      {carregando ? (
        <EmptyState>Carregando clientes...</EmptyState>
      ) : clientesFiltrados.length === 0 ? (
        <EmptyState>
          {filtro ? 'Nenhum cliente encontrado com esse filtro' : 'Nenhum cliente cadastrado'}
        </EmptyState>
      ) : (
        <ClientList>
          {clientesFiltrados.map((cliente) => (
            <ClientItem key={cliente.id}>
              <ClientInfo>
                <strong>{cliente.nome}</strong>
                {email && <span>Email: {cliente.email}</span>}
                {telefone && <span>Telefone: {cliente.telefone}</span>}
                <span>Cadastrado por: {cliente.cadastrado_por_usuario?.nome || 'Sistema'}</span>
              </ClientInfo>
              <ActionButtons>
                <EditButton onClick={() => handleEditar(cliente)}>
                  Editar
                </EditButton>
                <DeleteButton onClick={() => handleDeletar(cliente.id)}>
                  Excluir
                </DeleteButton>
              </ActionButtons>
            </ClientItem>
          ))}
        </ClientList>
      )}
    </Container>
  );
}