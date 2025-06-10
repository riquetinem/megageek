const { ItemComanda, Produto, User, Comanda } = require('../models');

module.exports = {
  async addItem(req, res) {
    try {
      const { comanda_id, produto_id, valor_unitario } = req.body;

      const comanda = await Comanda.findByPk(comanda_id);
      if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada' });
      if (comanda.status === 'fechada') return res.status(400).json({ error: 'Comanda já está fechada' });

      const item = await ItemComanda.create({
        comanda_id,
        produto_id,
        valor_unitario,
        adicionado_por: req.user.id
      });

      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  async removeItem(req, res) {
    try {
      const item = await ItemComanda.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Item não encontrado' });

      const comanda = await Comanda.findByPk(item.comanda_id);
      if (comanda.status === 'fechada') return res.status(400).json({ error: 'Comanda já está fechada' });

      await item.destroy();
      res.json({ message: 'Item removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover item' });
    }
  }
};
