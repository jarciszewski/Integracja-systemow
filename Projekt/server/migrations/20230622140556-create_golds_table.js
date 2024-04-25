'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gold', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gold');
  }
};
