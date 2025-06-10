module.exports = (sequelize, DataTypes) => {
  const TipoProduto = sequelize.define('TipoProduto', {
    nome: { type: DataTypes.STRING, allowNull: false }
  });

  TipoProduto.associate = (models) => {
    TipoProduto.hasMany(models.Produto, { foreignKey: 'tipo_produto_id' });
  };

  return TipoProduto;
};