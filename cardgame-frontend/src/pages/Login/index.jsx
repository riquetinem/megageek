import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../../api/auth';
import { useAuth } from '../../auth/AuthContext';
import { EyeIcon, EyeOffIcon } from '../../components/icons';
import LoadingButton from '../../components/LoadingButton';
import Logo from '../../assets/logo.png';
import {
  LoginContainer,
  LoginCard,
  LogoImage,
  Title,
  Form,
  InputGroup,
  InputLabel,
  InputField,
  PasswordToggle,
  SubmitButton,
  FooterText
} from './styles';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginRequest(email, senha);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      alert(`Falha no login. Verifique suas credenciais. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoImage src={Logo} alt="Logo da Loja" />
        <Title>Acesse sua conta</Title>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <InputField
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel htmlFor="senha">Senha</InputLabel>
            <InputField
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={toggleMostrarSenha}
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            >
              {mostrarSenha ? <EyeIcon /> : <EyeOffIcon />}
            </PasswordToggle>
          </InputGroup>

          <LoadingButton as={SubmitButton} loading={loading} type="submit">
            Entrar
          </LoadingButton>
        </Form>

        {/* <FooterText>
          Problemas para acessar? <a href="/recuperar-senha">Recuperar senha</a>
        </FooterText> */}
      </LoginCard>
    </LoginContainer>
  );
}