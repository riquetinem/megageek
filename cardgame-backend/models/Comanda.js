module.exports = (sequelize, DataTypes) => {
  const Comanda = sequelize.define('Comanda', {
    status: {
      type: DataTypes.ENUM('aberta', 'fechada'),
      defaultValue: 'aberta'
    },
    data_abertura: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    data_fechamento: { type: DataTypes.DATE, allowNull: true }
  });

  Comanda.associate = (models) => {
    Comanda.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
    Comanda.belongsTo(models.User, { foreignKey: 'aberto_por_id', as: 'abertoPor' });
    Comanda.belongsTo(models.User, { foreignKey: 'fechado_por_id', as: 'fechadoPor' });
    Comanda.hasMany(models.ItemComanda, { foreignKey: 'comanda_id' });
  };

  return Comanda;
};