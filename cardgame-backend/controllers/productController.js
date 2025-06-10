const { Produto, TipoProduto } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const produtos = await Produto.findAll({ include: TipoProduto });
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  },

  async getById(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id, { include: TipoProduto });
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      res.json(produto);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  async create(req, res) {
    try {
      const { nome, preco_padrao, tipo_produto_id } = req.body;
      const novo = await Produto.create({ nome, preco_padrao, tipo_produto_id });
      res.status(201).json(novo);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  async update(req, res) {
    try {
      const { nome, preco_padrao, tipo_produto_id } = req.body;
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      await produto.update({ nome, preco_padrao, tipo_produto_id });
      res.json(produto);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async remove(req, res) {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      await produto.destroy();
      res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover produto' });
    }
  }
};
