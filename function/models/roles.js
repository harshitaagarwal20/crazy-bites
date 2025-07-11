'use strict';

import { Model } from 'sequelize';

const Role = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {

      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        sourceKey:'roleUId',
        as: 'users',
      });

     Role.belongsToMany(models.Permission, {
  through: 'permissionroles',
  as: 'permissions',
  foreignKey: 'roleId',
  otherKey: 'permissionId',
  sourceKey: 'roleUId',
});


    }
  }

  Role.init(
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleUId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
            
      tableName: 'roles',      
      timestamps: true,       }
  );

  return Role;
};

export default Role;
