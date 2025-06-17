import { useState } from 'react';
import { cadastrarUsuario } from '../api/user';

export default function CadastroFuncionario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('funcionario');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarUsuario({ nome, email, senha, role });
      setMensagem('Funcionário cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setRole('funcionario');
    } catch (err) {
      setMensagem(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Cadastrar Funcionário</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nome"
          className="border w-full p-2"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border w-full p-2"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <select
          className="border w-full p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Administrador</option>
          <option value="gerente">Gerente</option>
          <option value="funcionario">Funcionário</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Cadastrar
        </button>
      </form>

      {mensagem && <p className="mt-4 text-center">{mensagem}</p>}
    </div>
  );
}
