import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';

// Componentes estilizados
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  font-weight: 600;
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  grid-column: 1 / -1;
  max-width: 200px;
  
  &:hover {
    background-color: #3a5bbf;
  }
`;

const ProductsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
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
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 0.5rem;
  
  &.edit {
    background-color: #f6ad55;
    color: white;
    
    &:hover {
      background-color: #e69b3e;
    }
  }
  
  &.delete {
    background-color: #e53e3e;
    color: white;
    
    &:hover {
      background-color: #c53030;
    }
  }
`;

export default function ProdutosPage() {
  const { token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    preco_padrao: '',
    tipo_produto_id: '',
    estoque: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    carregarProdutos();
    carregarTipos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/product');
      setProdutos(res.data);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const carregarTipos = async () => {
    try {
      const res = await api.get('/tipo-produto');
      setTipos(res.data);
    } catch (err) {
      console.error('Erro ao carregar tipos:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        estoque: parseInt(form.estoque) || 0,
        preco_padrao: parseFloat(form.preco_padrao) || 0
      };
      
      if (editandoId) {
        await api.put(`/product/${editandoId}`, payload);
      } else {
        await api.post('/product', payload);
      }
      
      setForm({ nome: '', preco_padrao: '', tipo_produto_id: '', estoque: '' });
      setEditandoId(null);
      await carregarProdutos();
    } catch (err) {
      alert(`Erro ao salvar produto: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const editar = (produto) => {
    setForm({
      nome: produto.nome,
      preco_padrao: produto.preco_padrao,
      tipo_produto_id: produto.tipo_produto_id,
      estoque: produto.estoque
    });
    setEditandoId(produto.id);
  };

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        setLoading(true);
        await api.delete(`/product/${id}`);
        await carregarProdutos();
      } catch (err) {
        alert(`Erro ao excluir produto: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Produtos</PageTitle>
      </PageHeader>

      <FormContainer>
        <FormTitle>{editandoId ? 'Editar Produto' : 'Cadastrar Novo Produto'}</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <div>
              <label htmlFor="nome">Nome do Produto</label>
              <InputField
                id="nome"
                type="text"
                placeholder="Ex: Camiseta"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="preco">Preço (R$)</label>
              <InputField
                id="preco"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 49.90"
                value={form.preco_padrao}
                onChange={(e) => setForm({ ...form, preco_padrao: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="estoque">Estoque</label>
              <InputField
                id="estoque"
                type="number"
                min="0"
                placeholder="Quantidade"
                value={form.estoque}
                onChange={(e) => setForm({ ...form, estoque: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="tipo">Tipo de Produto</label>
              <SelectField
                id="tipo"
                value={form.tipo_produto_id}
                onChange={(e) => setForm({ ...form, tipo_produto_id: e.target.value })}
                required
              >
                <option value="">Selecione um tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </option>
                ))}
              </SelectField>
            </div>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Salvando...' : editandoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
            </SubmitButton>
          </FormGrid>
        </form>
      </FormContainer>

      <div style={{ marginTop: '2rem' }}>
        <ProductsTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>Produto</TableHeaderCell>
              <TableHeaderCell>Preço</TableHeaderCell>
              <TableHeaderCell>Estoque</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {loading && produtos.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" style={{ textAlign: 'center' }}>
                  Carregando produtos...
                </TableCell>
              </TableRow>
            ) : produtos.length === 0 ? (
              <TableRow>
                <TableCell colSpan="5" style={{ textAlign: 'center' }}>
                  Nenhum produto cadastrado
                </TableCell>
              </TableRow>
            ) : (
              produtos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.nome}</TableCell>
                  <TableCell>R$ {parseFloat(p.preco_padrao).toFixed(2)}</TableCell>
                  <TableCell>{p.estoque}</TableCell>
                  <TableCell>{p.TipoProduto?.nome || '-'}</TableCell>
                  <TableCell>
                    <ActionButton 
                      className="edit" 
                      onClick={() => editar(p)}
                      disabled={loading}
                    >
                      Editar
                    </ActionButton>
                    <ActionButton 
                      className="delete" 
                      onClick={() => excluir(p.id)}
                      disabled={loading}
                    >
                      Excluir
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </ProductsTable>
      </div>
    </PageContainer>
  );
}