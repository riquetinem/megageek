const { Cliente, User } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const clientes = await Cliente.findAll({ include: { model: User, as: 'cadastrado_por_usuario' } });
      console.log(`clientes: ${clientes}`);
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  },

  async getById(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id, { include: { model: User, as: 'cadastrado_por_usuario' } });
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      res.json(cliente);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  },

  async create(req, res) {
    try {
      console.log(req.body.user);
      const { nome, telefone, user } = req.body;
      const cliente = await Cliente.create({ nome, telefone, criado_por_id: user.id });
      res.status(201).json(cliente);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  async update(req, res) {
    try {
      const { nome, contato } = req.body;
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      await cliente.update({ nome, contato });
      res.json(cliente);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  async remove(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      await cliente.destroy();
      res.json({ message: 'Cliente removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover cliente' });
    }
  }
};