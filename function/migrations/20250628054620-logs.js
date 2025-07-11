// migrations/xxxx-create-userlogs.js
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER, // who performed the change
        allowNull: false
      },
      action: {
        type: Sequelize.STRING, // e.g., update, delete
        allowNull: false
      },
      targetTable: {
        type: Sequelize.STRING, // e.g., Users, Posts
        allowNull: false
      },
      targetId: {
        type: Sequelize.INTEGER, // ID of the modified record
        allowNull: false
      },
      changes: {
        type: Sequelize.JSON, // { field: [old, new] }
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

  async down(queryInterface) {
    await queryInterface.dropTable('UserLogs');
  }
};
