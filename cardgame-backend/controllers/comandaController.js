const { Comanda, Cliente, User, ItemComanda, Produto } = require('../models');
const { Op } = require('sequelize'); // Adicione esta linha

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
            as: 'itens',
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
        aberto_por_id: req.user.id,
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
            as: 'itens',
            include: [Produto]
          }
        ]
      });

      if (!comanda) {
        return res.status(404).json({ error: 'Comanda não encontrada' });
      }

      if (comanda.status === 'fechada') {
        return res.status(400).json({ error: 'Comanda já está fechada' });
      }

      // Calcula o total: preco_unitario * quantidade
      const total = comanda.itens.reduce((acc, item) => {
        const valor = parseFloat(item.preco_unitario || 0);
        const qtd = parseInt(item.quantidade || 1);
        return acc + (valor * qtd);
      }, 0);

      comanda.status = 'fechada';
      comanda.fechado_por_id = req.user.id;
      comanda.data_fechamento = new Date();
      comanda.valor_total = total.toFixed(2);

      await comanda.save();

      res.json({
        message: 'Comanda fechada com sucesso',
        total: comanda.valor_total
      });
    } catch (err) {
      console.error('Erro ao fechar comanda:', err);
      res.status(500).json({ error: 'Erro ao fechar comanda' });
    }
  },

  async getComandasDoDia(req, res) {
    try {
      const hoje = new Date();
      const inicioDia = new Date(hoje.setHours(0, 0, 0, 0));
      const fimDia = new Date(hoje.setHours(23, 59, 59, 999));

      const comandas = await Comanda.findAll({
        where: {
          data_abertura: {
            [Op.between]: [inicioDia, fimDia]
          }
        },
        include: [
          { model: Cliente },
          { model: User, as: 'abertoPor' }
        ],
        order: [['data_abertura', 'DESC']]
      });

      console.log(hoje)
      console.log(comandas);

      res.json(comandas);
    } catch (err) {
      console.error('Erro ao buscar comandas do dia:', err);
      res.status(500).json({ error: 'Erro ao buscar comandas do dia' });
    }
  },

  async getComandasFiltradas(req, res) {
    try {
      const { cliente_id, usuario_id, status, data_inicio, data_fim } = req.query;
      const where = {};

      if (status) where.status = status;
      if (cliente_id) where.cliente_id = cliente_id;
      if (usuario_id) where.aberto_por_id = usuario_id;

      if (data_inicio && data_fim) {
        where.data_abertura = {
          [Op.between]: [
            new Date(data_inicio),
            new Date(data_fim + 'T23:59:59.999Z')
          ]
        };
      } else if (data_inicio) {
        where.data_abertura = {
          [Op.gte]: new Date(data_inicio)
        };
      } else if (data_fim) {
        where.data_abertura = {
          [Op.lte]: new Date(data_fim + 'T23:59:59.999Z')
        };
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
      console.error('Erro ao buscar comandas filtradas:', err);
      res.status(500).json({ error: 'Erro ao buscar comandas filtradas' });
    }
  }
};
