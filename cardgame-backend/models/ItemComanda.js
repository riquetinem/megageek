module.exports = (sequelize, DataTypes) => {
  const ItemComanda = sequelize.define('ItemComanda', {
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  ItemComanda.associate = (models) => {
    ItemComanda.belongsTo(models.Comanda, { foreignKey: 'comanda_id' });
    ItemComanda.belongsTo(models.Produto, { foreignKey: 'produto_id' });
    ItemComanda.belongsTo(models.User, { foreignKey: 'adicionado_por_id', as: 'adicionadoPor' });
  };

  return ItemComanda;
};
