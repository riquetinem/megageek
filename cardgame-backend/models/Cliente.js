module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: { type: DataTypes.STRING, allowNull: false }
  });

  Cliente.associate = (models) => {
    Cliente.belongsTo(models.User, { foreignKey: 'criado_por_id' });
    Cliente.hasMany(models.Comanda, { foreignKey: 'cliente_id' });
  };

  return Cliente;
};
