'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clientes', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clientes', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
