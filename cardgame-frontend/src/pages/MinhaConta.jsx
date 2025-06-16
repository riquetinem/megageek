import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser } from '../api/user';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MinhaContaPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', novaSenha: '' });
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();
      setForm({ nome: data.nome, email: data.email, senha: '', novaSenha: '' });
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUser({ nome: form.nome, senha: form.novaSenha, senhaAtual: form.senha });
      login({ ...user, nome: data.nome });
      alert('Dados atualizados com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao atualizar dados: ' + err.response?.data?.error);
    }
  };

  return (
    <div>
      <h1>Minha Conta</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="email" value={form.email} disabled />
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          placeholder="Senha atual"
          required
        />
        <input
          type="password"
          name="novaSenha"
          value={form.novaSenha}
          onChange={handleChange}
          placeholder="Nova senha (opcional)"
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
