import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './auth/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard';
import NovaComanda from './pages/NovaComanda';
import DetalhesComanda from './pages/DetalhesComanda';
import ListarComandas from './pages/ListarComandas';
import Produtos from './pages/Produto';
import Categorias from './pages/TipoProduto';
import Cliente from './pages/Cliente';
import NovoUsuario from './pages/NovoUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirecionamento da raiz para login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Rotas protegidas */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nova-comanda" element={<NovaComanda />} />
            <Route path="/comandas/:id" element={<DetalhesComanda />} />
            <Route path="/comandas" element={<ListarComandas />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/clientes" element={<Cliente />} />
            <Route path="/novo-usuario" element={<NovoUsuario />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
