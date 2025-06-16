import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import Logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginRequest(email, senha);
      login(data); // Salva token e dados do usuário no contexto
      navigate('/dashboard');
    } catch (err) {
      alert(`Falha no login. Verifique suas credenciais. ${err}`);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <img src={Logo} alt="Logo da Loja" style={{ width: '300px', marginBottom: '2rem' }} />
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '1rem' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
