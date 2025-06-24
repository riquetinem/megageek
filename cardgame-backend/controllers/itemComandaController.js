const { ItemComanda, Produto, User, Comanda } = require('../models');

module.exports = {
  async addItem(req, res) {
    try {
      const { comanda_id, produto_id, quantidade, user, precoUnitario } = req.body;

      const comanda = await Comanda.findByPk(comanda_id);
      if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada' });
      if (comanda.status === 'fechada') return res.status(400).json({ error: 'Comanda já está fechada' });

      const produto = await Produto.findByPk(produto_id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

      if (produto.estoque < quantidade) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      const item = await ItemComanda.create({
        comanda_id,
        produto_id,
        quantidade,
        preco_unitario: precoUnitario,
        adicionadoPor: user.id
      });

      // Subtrair do estoque
      produto.estoque -= quantidade;
      await produto.save();

      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  async removeItem(req, res) {
    try {
      const item = await ItemComanda.findByPk(req.params.id, { include: Produto });
      if (!item) return res.status(404).json({ error: 'Item não encontrado' });

      const comanda = await Comanda.findByPk(item.comanda_id);
      if (comanda.status === 'fechada') return res.status(400).json({ error: 'Comanda já está fechada' });

      item.Produto.estoque += item.quantidade;
      await item.Produto.save();

      await item.destroy();
      res.json({ message: 'Item removido com sucesso' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover item' });
    }
  },

   async updateQuantidade(req, res) {
    try {
      const { id } = req.params;
      const { novaQuantidade } = req.body;

      const item = await ItemComanda.findByPk(id, { include: Produto });
      if (!item) return res.status(404).json({ error: 'Item não encontrado' });

      const comanda = await Comanda.findByPk(item.comanda_id);
      if (!comanda || comanda.status === 'fechada') {
        return res.status(400).json({ error: 'Comanda já está fechada ou não encontrada' });
      }

      const diferenca = novaQuantidade - item.quantidade;

      if (diferenca > 0 && item.Produto.estoque < diferenca) {
        return res.status(400).json({ error: 'Estoque insuficiente para atualizar a quantidade' });
      }

      // Atualiza estoque
      item.Produto.estoque -= diferenca;
      await item.Produto.save();

      item.quantidade = novaQuantidade;
      await item.save();

      res.json({ message: 'Quantidade atualizada com sucesso', item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar quantidade' });
    }
  }
};
