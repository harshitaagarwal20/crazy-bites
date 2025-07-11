'use strict';

const Migration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FlatUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flatId: {
        type: Sequelize.STRING,
        allowNull:false
      },
      UserId: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FlatUsers');
  }
};

export default Migration