const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['senha_hash'] } });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async createUser(req, res) {
    try {
      const { nome, email, senha, role } = req.body;

      if (!['admin', 'gerente', 'funcionario'].includes(role)) {
        return res.status(400).json({ error: 'Role inválida' });
      }

      const hashed = await bcrypt.hash(senha, 10);
      const novoUsuario = await User.create({ nome, email, senha_hash: hashed, role });

      return res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email, role: novoUsuario.role });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async disableUser(req, res) {
    try {
      const { id } = req.params;
      const usuario = await User.findByPk(id);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

      usuario.ativo = false;
      await usuario.save();

      return res.json({ message: 'Usuário desativado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar usuário' });
    }
  }
};
