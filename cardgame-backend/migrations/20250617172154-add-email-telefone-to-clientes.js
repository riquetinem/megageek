module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clientes', 'email', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clientes', 'telefone', {
      type: Sequelize.STRING
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clientes', 'email');
    await queryInterface.removeColumn('Clientes', 'telefone');
  }
};
