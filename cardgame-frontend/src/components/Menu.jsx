import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Menu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#222', padding: '1rem', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: '1rem', color: '#fff' }}>Dashboard</Link>
        <Link to="/comandas" style={{ marginRight: '1rem', color: '#fff' }}>Comandas</Link>
        <Link to="/clientes" style={{ marginRight: '1rem', color: '#fff' }}>Clientes</Link>
        <Link to="/produtos" style={{ marginRight: '1rem', color: '#fff' }}>Produtos</Link>
        <Link to="/tipo-produto" style={{ marginRight: '1rem', color: '#fff' }}>Tipo Produto</Link>
        <Link to="/minha-conta" style={{ marginRight: '1rem', color: '#fff' }}>Minha Conta</Link>
      </div>
      <button onClick={handleLogout} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
        Sair
      </button>
    </nav>
  );
}
