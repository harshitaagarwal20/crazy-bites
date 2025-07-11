'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visitors', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false
      },
      flatId: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      vehicleNum:{
         type: Sequelize.STRING,
      },
       SenderId:{
         type:Sequelize.STRING,
         allowNull:false
     },
        RecieverId:{
         type:Sequelize.STRING,
         allowNull:false
       },

       status:{
type:Sequelize.ENUM('pending','approved'),
         allowNull:false
       },

      inTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      outTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visitors');
  }
};
