'use strict';
/** @type {import('sequelize-cli').Migration} */
const Migration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flatUId: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        unique:true

      },
      flatNumber: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      floor: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      block: {
        type: Sequelize.STRING,
        allowNull:false
      },
      flatType: {
        type: Sequelize.STRING,
        allowNull:false
      },
      areapersqfeet:{
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
    await queryInterface.dropTable('Flats',{
      UserId:{
        type:Sequelize.STRING,
        
      }
    });
  }
};

export default Migration