import { useEffect, useState } from 'react';
import { getTiposProduto, createTipoProduto, updateTipoProduto, deleteTipoProduto } from '../api/tipoProduto';
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
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;

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
  min-width: 200px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
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

const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: 1px solid #6c757d;
  border-radius: 4px;
  background-color: transparent;
  color: #6c757d;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const TypeCard = styled.div`
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TypeName = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
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
  flex: 1;

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
  flex: 1;

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
  grid-column: 1 / -1;
`;

export default function TipoProdutoPage() {
  const [tipos, setTipos] = useState([]);
  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const fetchTipos = async () => {
    setCarregando(true);
    try {
      const data = await getTiposProduto();
      setTipos(data);
    } catch (err) {
      console.error('Erro ao carregar tipos de produto:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateTipoProduto(editando.id, { nome });
      } else {
        await createTipoProduto({ nome });
      }
      setNome('');
      setEditando(null);
      await fetchTipos();
    } catch (err) {
      console.error('Erro ao salvar tipo de produto:', err);
      alert('Erro ao salvar tipo de produto');
    }
  };

  const handleEdit = (tipo) => {
    setNome(tipo.nome);
    setEditando(tipo);
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este tipo de produto?')) return;
    try {
      await deleteTipoProduto(id);
      await fetchTipos();
    } catch (err) {
      console.error('Erro ao excluir tipo de produto:', err);
      alert('Erro ao excluir tipo de produto');
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <Container>
      <Title>Tipos de Produto</Title>

      <FormContainer onSubmit={handleSubmit}>
        <FormInput
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do tipo de produto"
          required
        />
        <SubmitButton type="submit">
          {editando ? 'Salvar Alterações' : 'Cadastrar Tipo'}
        </SubmitButton>
        {editando && (
          <CancelButton
            type="button"
            onClick={() => {
              setNome('');
              setEditando(null);
            }}
          >
            Cancelar
          </CancelButton>
        )}
      </FormContainer>

      {carregando ? (
        <EmptyState>Carregando tipos de produto...</EmptyState>
      ) : tipos.length === 0 ? (
        <EmptyState>Nenhum tipo de produto cadastrado</EmptyState>
      ) : (
        <TypesGrid>
          {tipos.map((tipo) => (
            <TypeCard key={tipo.id}>
              <TypeName>{tipo.nome}</TypeName>
              <CardActions>
                <EditButton onClick={() => handleEdit(tipo)}>
                  Editar
                </EditButton>
                <DeleteButton onClick={() => handleDelete(tipo.id)}>
                  Excluir
                </DeleteButton>
              </CardActions>
            </TypeCard>
          ))}
        </TypesGrid>
      )}
    </Container>
  );
}