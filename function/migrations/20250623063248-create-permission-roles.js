'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('PermissionRoles', {
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    }
  });
}

