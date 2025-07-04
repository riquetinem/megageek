module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Produtos', 'estoque', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Produtos', 'estoque');
  }
};
