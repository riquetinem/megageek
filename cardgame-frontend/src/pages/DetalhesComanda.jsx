import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { buscarComanda, adicionarItemComanda, fecharComanda, removerItemComanda } from '../api/comandas';
import { useAuth } from '../auth/AuthContext';
import api from '../api/api';
import { formatDateToBr } from '../utils/dateFormatter';
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

const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  
  strong {
    display: block;
    margin-bottom: 0.3rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
  
  span {
    font-size: 1.1rem;
    color: #343a40;
  }
`;

const TotalValue = styled.div`
  background-color: #4e73df;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 1.5rem 0;
`;

const ItemsList = styled.ul`
  margin: 2rem 0;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
`;

const ItemRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
  background-color: ${({ $index }) => ($index % 2 === 0 ? '#fff' : '#f9f9f9')};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  
  .product-name {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  
  .product-meta {
    display: flex;
    gap: 1rem;
    color: #6c757d;
    font-size: 0.9rem;
  }
`;

const AddItemSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Select = styled.select`
  flex: 2;
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  max-width: 100px;
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
  
  &:hover {
    background-color: #3a5bbf;
  }
  
  &.danger {
    background-color: #e74c3c;
    
    &:hover {
      background-color: #c0392b;
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  transition: all 0.3s;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function DetalhesComanda() {
  const { user } = useAuth();
  const { id } = useParams();
  const [comanda, setComanda] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [precoUnitario, setPrecoUnitario] = useState('');

  const carregarDados = async () => {
    const c = await buscarComanda(id);
    setComanda(c);
  };

  const valorTotalComanda = useMemo(() => {
    if (!comanda || !comanda.itens) return '0.00';
    
    return comanda.itens.reduce((total, item) => {
      const preco = Number(item.preco_unitario) || 0;
      const quantidade = Number(item.quantidade) || 0;
      return total + (preco * quantidade);
    }, 0).toFixed(2);
  }, [comanda]); 

  function calcularTotal(preco, quantidade) {
    const precoNum = Number(preco) || 0;
    const quantidadeNum = Number(quantidade) || 1;
    
    return (precoNum * quantidadeNum).toFixed(2);
  }

  useEffect(() => {
    carregarDados();
    api.get('/product').then(res => setProdutos(res.data));
  }, []);

  const handleAdicionarItem = async () => {
    if (!produtoSelecionado || quantidade <= 0) {
      alert('Escolha um produto e uma quantidade válida');
      return;
    }

    await adicionarItemComanda(comanda.id, Number(produtoSelecionado), quantidade, user, Number(precoUnitario));
    setProdutoSelecionado('');
    setQuantidade(1);
    setPrecoUnitario('');
    await carregarDados();
  };

  const handleFecharComanda = async () => {
    try {
      await fecharComanda(comanda.id);
      await carregarDados();
      alert('Comanda fechada com sucesso!');
    } catch (err) {
      alert('Erro ao fechar comanda', err);
    }
  };

  if (!comanda) return <div>Carregando...</div>;

  return (
    <Container>
      <Header>
        <Title>Comanda #{comanda.id}</Title>
        
        <InfoGrid>
          <InfoItem>
            <strong>Cliente</strong>
            <span>{comanda.Cliente?.nome || 'Não informado'}</span>
          </InfoItem>

          <InfoItem>
            <strong>Dados do Cliente</strong>
            <span>{comanda.Cliente?.email || '-'} {comanda.Cliente?.telefone || '-'}</span>
          </InfoItem>
          
          <InfoItem>
            <strong>Status</strong>
            <span style={{ color: comanda.fechada ? '#e74c3c' : '#28a745' }}>
              {comanda.fechada ? 'Fechada' : 'Aberta'}
            </span>
          </InfoItem>
          
          <InfoItem>
            <strong>Data de Abertura</strong>
            <span>{formatDateToBr(comanda.createdAt)}</span>
          </InfoItem>
          
          <InfoItem>
            <strong>Atendente</strong>
            <span>{comanda.abertoPor?.nome || 'Não informado'}</span>
          </InfoItem>
        </InfoGrid>
        
        <TotalValue>
          Valor Total: R$ {valorTotalComanda}
        </TotalValue>
        
        {!comanda.fechada && (
          <Button className="danger" onClick={handleFecharComanda}>
            Fechar Comanda
          </Button>
        )}
      </Header>

      <h2 className="text-lg font-semibold mb-2">Itens da Comanda</h2>
      <ItemsList>
        {comanda.itens.map((item, index) => (
          <ItemRow key={item.id} $index={index}>
            <ItemDetails>
              <div className="product-name">{item.Produto.nome}</div>
              <div className="product-meta">
                <span>{item.quantidade}x</span>
                <span>R$ {item.preco_unitario}</span>
                <span>Total: R$ {calcularTotal(item.preco_unitario, item.quantidade)}</span>
              </div>
            </ItemDetails>
            
            {!comanda.fechada && (
              <RemoveButton
                onClick={async () => {
                  if (confirm('Tem certeza que deseja remover este item?')) {
                    await removerItemComanda(item.id);
                    await carregarDados();
                  }
                }}
              >
                Remover
              </RemoveButton>
            )}
          </ItemRow>
        ))}
      </ItemsList>

      {!comanda.fechada && (
        <AddItemSection>
          <h2 className="text-lg font-semibold mb-4">Adicionar Item</h2>
          
          <FormRow>
            <Select
              value={produtoSelecionado || ''} // Garante que nunca será null
              onChange={(e) => {
                const selectedId = e.target.value;
                setProdutoSelecionado(selectedId);
                
                // Define o preço padrão quando um produto é selecionado
                const produto = produtos.find(p => p.id.toString() === selectedId); // Compare como strings
                if (produto) {
                  setPrecoUnitario(produto.preco_padrao);
                } else {
                  setPrecoUnitario('');
                }
              }}
            >
              <option value="">Selecione um produto</option>
              {produtos.map(p => (
                <option key={p.id} value={p.id.toString()}> {/* Converta o id para string */}
                  {p.nome} - R$ {Number(p.preco_padrao).toFixed(2)}
                </option>
              ))}
            </Select>
            
            <Input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              placeholder="Quantidade"
            />
            
            <Input
              type="number"
              min="0"
              step="0.01"
              value={precoUnitario}
              onChange={(e) => setPrecoUnitario(e.target.value)}
              placeholder="Preço unitário"
            />
            
            <Button onClick={handleAdicionarItem}>
              Adicionar
            </Button>
          </FormRow>
        </AddItemSection>
      )}
    </Container>
  );
}