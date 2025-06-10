module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING },
    preco_padrao: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  Produto.associate = (models) => {
    Produto.belongsTo(models.TipoProduto, { foreignKey: 'tipo_produto_id' });
    Produto.hasMany(models.ItemComanda, { foreignKey: 'produto_id' });
  };

  return Produto;
};