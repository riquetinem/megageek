const { TipoProduto } = require('../models');

module.exports = {
  // Lista todos os tipos de produto
  async getAll(req, res) {
    try {
      const tipos = await TipoProduto.findAll();
      res.json(tipos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar tipos de produto' });
    }
  },

  // Cadastra um novo tipo de produto
  async create(req, res) {
    try {
      const { nome } = req.body;

      if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

      const existente = await TipoProduto.findOne({ where: { nome } });
      if (existente) return res.status(400).json({ error: 'Tipo de produto já existe' });

      const novo = await TipoProduto.create({ nome });
      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar tipo de produto' });
    }
  },

  // Buscar por ID (opcional)
  async getById(req, res) {
    try {
      const tipo = await TipoProduto.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de produto não encontrado' });
      res.json(tipo);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar tipo de produto' });
    }
  },

  // Atualizar tipo (opcional)
  async update(req, res) {
    try {
      const { nome } = req.body;
      const tipo = await TipoProduto.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de produto não encontrado' });
      await tipo.update({ nome });
      res.json(tipo);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar tipo de produto' });
    }
  },

  // Remover tipo (opcional)
  async remove(req, res) {
    try {
      const tipo = await TipoProduto.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de produto não encontrado' });
      await tipo.destroy();
      res.json({ message: 'Tipo de produto removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover tipo de produto' });
    }
  }
};
