'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Comandas', 'valor_total', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true, 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comandas', 'valor_total');
  }
};
