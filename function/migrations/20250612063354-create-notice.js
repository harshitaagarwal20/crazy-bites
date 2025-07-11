'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notices', {
    
      id:{
        
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 

      userId:{
        type: Sequelize.STRING,
      }
      ,

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('General', 'Urgent', 'Event', 'Maintenance'),
        allowNull: false
      },
      isPinned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Notices');
  }
};
