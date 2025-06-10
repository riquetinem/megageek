const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

module.exports = {
  register: async (req, res) => {
    try {
      const { nome, email, senha, role } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const user = await User.create({
        nome,
        email,
        senha: hashedPassword,
        role: role || 'funcionario',
      });

      return res.status(201).json({ message: 'Usuário criado com sucesso', user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida) return res.status(401).json({ error: 'Senha inválida' });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: '8h',
      });

      return res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },
};
