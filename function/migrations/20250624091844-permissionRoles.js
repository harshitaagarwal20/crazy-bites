export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('PermissionRoles', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roleId: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
     
      
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('PermissionRoles');
}
