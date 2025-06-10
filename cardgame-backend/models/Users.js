
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha_hash: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('admin', 'gerente', 'funcionario'),
      allowNull: false
    },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
  });

  User.associate = (models) => {
    User.hasMany(models.Cliente, { foreignKey: 'criado_por_id' });
    User.hasMany(models.Comanda, { foreignKey: 'aberto_por_id', as: 'ComandasAbertas' });
    User.hasMany(models.Comanda, { foreignKey: 'fechado_por_id', as: 'ComandasFechadas' });
    User.hasMany(models.ItemComanda, { foreignKey: 'adicionado_por_id' });
  };

  return User;
};
