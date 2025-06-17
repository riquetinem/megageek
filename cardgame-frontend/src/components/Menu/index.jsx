import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';

// Estilos opcionais para melhorar a aparência
const StyledNav = styled(Nav)`
  background-color: #2c3e50;
  padding: 0.5rem 1rem;
  align-items: center;
  
  .nav-link {
    color: #fff !important;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 4px 4px 0 0;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    &.active {
      background-color: #4e73df;
      font-weight: 600;
    }
  }
`;

const LogoImage = styled.img`
  height: 80px; 
  width: autopx; 
  max-width: 120px;
  object-fit: contain;
  margin-left: 25%;
`;

const LogoutButton = styled.button`
  color: #fff;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: #e74c3c;
  }
`;

export default function Menu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Obtém a rota atual para marcar a tab ativa
  const activeKey = window.location.pathname;

  return (
    <StyledNav justify variant="tabs" activeKey={activeKey}>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard" eventKey="/dashboard">
          <LogoImage src={Logo} alt="Home" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/comandas" eventKey="/comandas">Todas Comandas</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/clientes" eventKey="/clientes">Clientes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/produtos" eventKey="/produtos">Produtos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/categorias" eventKey="/categorias">Tipo Produto</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/novo-usuario" eventKey="/novo-usuario">Novo Usuário</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link as={Link} to="/minha-conta" eventKey="/minha-conta">Minha Conta</Nav.Link>
      </Nav.Item> */}
      <Nav.Item>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Nav.Item>
    </StyledNav>
  );
}