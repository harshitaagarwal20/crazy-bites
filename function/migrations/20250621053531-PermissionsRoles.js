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
      references: {
        model: 'Roles', 
        key: 'roleUId'  
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Permissions', 
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
