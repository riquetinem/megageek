module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    telefone: {
      type: DataTypes.STRING
    }
  });

  Cliente.associate = (models) => {
    Cliente.belongsTo(models.User, {
      foreignKey: 'criado_por_id',
      as: 'cadastrado_por_usuario',
    });
    Cliente.hasMany(models.Comanda, { foreignKey: 'cliente_id' });
  };

  return Cliente;
};
