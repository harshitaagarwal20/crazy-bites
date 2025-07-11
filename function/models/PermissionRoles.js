'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class PermissionRole extends Model {
    static associate(models) {
      // No need to define associations here since it's a join table
    }
  }

 PermissionRole.init({
  roleId: {
    type: DataTypes.STRING, 
    allowNull: false,
    references: {
      model: 'roles',
      key: 'roleUId',        
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Permissions',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'PermissionRole',
  tableName: 'permissionroles',
  timestamps: false,
});

return PermissionRole;
};