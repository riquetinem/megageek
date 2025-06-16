const { Comanda, Cliente, User, ItemComanda, Produto } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const where = {};
      if (req.query.status) {
        where.status = req.query.status;
      }

      const comandas = await Comanda.findAll({
        where,
        include: [
          { model: Cliente },
          { model: User, as: 'abertoPor' },
          { model: User, as: 'fechadoPor' },
        ],
        order: [['data_abertura', 'DESC']]
      });

      res.json(comandas);
    } catch (err) {
      console.error('Erro interno ao buscar comandas:', err);
      res.status(500).json({ error: 'Erro ao buscar comandas' });
    }
  },

  async getById(req, res) {
    try {
      const comanda = await Comanda.findByPk(req.params.id, {
        include: [
          { model: Cliente },
          { model: User, as: 'abertoPor' },
          { model: User, as: 'fechadoPor' },
          {
            model: ItemComanda,
            include: [
              { model: Produto },
              { model: User, as: 'adicionadoPor' },
            ]
          }
        ]
      });
      if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada' });
      res.json(comanda);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar comanda' });
    }
  },

  async create(req, res) {
    try {
      const { cliente_id } = req.body;
      const nova = await Comanda.create({
        cliente_id,
        aberto_por: req.user.id,
        data_abertura: new Date(),
        status: 'aberta'
      });
      res.status(201).json(nova);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao abrir comanda' });
    }
  },

  async close(req, res) {
    try {
      const comanda = await Comanda.findByPk(req.params.id, {
        include: [
          {
            model: ItemComanda,
            include: [Produto]
          }
        ]
      });

      if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada' });
      if (comanda.status === 'fechada') return res.status(400).json({ error: 'Comanda já está fechada' });

      const total = comanda.ItemComandas.reduce((acc, item) => acc + parseFloat(item.valor_unitario), 0);

      comanda.status = 'fechada';
      comanda.fechado_por_id = req.user.id;
      comanda.data_fechamento = new Date();
      comanda.valor_total = total;
      await comanda.save();

      res.json({ message: 'Comanda fechada com sucesso', total });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao fechar comanda' });
    }
  }
};
