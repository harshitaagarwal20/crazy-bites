'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
  through: models.PermissionRole,
  as: 'roles',
  foreignKey: 'permissionId',
  otherKey: 'roleId',
  targetKey: 'roleUId', 
});

    }
  }

  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING,
      },
      resource: { 
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );

  return Permission;
};
