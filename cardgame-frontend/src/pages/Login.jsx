import { useState } from 'react';
import { login as loginRequest } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginRequest(email, senha);
      console.log('Login bem-sucedido:', response);
      // você pode salvar o token aqui (em contexto, localStorage, etc.)
    } catch (err) {
      console.error('Erro no login:', err);
      alert('Falha ao fazer login');
    }
  };

  return (
    <div>
      <h1>Login funcionando!</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
