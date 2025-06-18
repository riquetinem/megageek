import { useState } from 'react';
import { cadastrarUsuario } from '../api/user';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

export default function CadastroFuncionario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('funcionario');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await cadastrarUsuario({ nome, email, senha, role });
      setMensagem({ texto: 'Funcionário cadastrado com sucesso!', tipo: 'success' });
      setNome('');
      setEmail('');
      setSenha('');
      setRole('funcionario');
      setValidated(false);
    } catch (err) {
      setMensagem({ 
        texto: err.response?.data?.error || 'Erro ao cadastrar funcionário', 
        tipo: 'danger' 
      });
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Cadastrar Novo Funcionário</h2>
        </Card.Header>
        
        <Card.Body>
          {mensagem.texto && (
            <Alert variant={mensagem.tipo} onClose={() => setMensagem({ texto: '', tipo: '' })} dismissible>
              {mensagem.texto}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira o nome do funcionário.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="exemplo@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, insira um email válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crie uma senha segura"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                A senha deve ter pelo menos 6 caracteres.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Mínimo de 6 caracteres
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formCargo">
              <Form.Label>Cargo</Form.Label>
              <Form.Select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Administrador</option>
                <option value="gerente">Gerente</option>
                <option value="funcionario">Funcionário</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Cadastrar Funcionário
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}