'use strict';
import { Model } from 'sequelize';

const UserModel = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'roles', 
      });

      

      User.hasMany(models.FlatUser, {
        foreignKey: 'UserId',
        sourceKey: 'id',
        
      });

      User.hasMany(models.Complaint, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'userComplaint',
      });

      User.hasMany(models.Notice, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'userNotice',
      });

      User.hasMany(models.Maintenance, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'userMaintenance',
      });

      User.hasMany(models.UserLog, { 
        foreignKey: 'userId' 
      });

    }
  }

  User.init(
    {
      full_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      
      mobile: DataTypes.BIGINT(10),
      role: {
        type:DataTypes.STRING,
      },
      LicenceNo:{
        type:DataTypes.STRING,
        allowNull:false
      },

    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'userss',
      timestamps: true,


      hooks: {
      async afterUpdate(user, options) {
        const changedFields = user.changed(); 
        const changes = {};

        if (changedFields) {
          for (const field of changedFields) {
            changes[field] = [
              user._previousDataValues[field],
              user.dataValues[field]
            ];
          }

          if (options.context?.userId) {
            await sequelize.models.UserLog.create({
              userId: options.context.userId, 
              action: 'update',
              targetTable: 'Users',
              targetId: user.id,
              changes: changes
            });
          }
        }
      }
    }
  }
);
    
  return User;
};

export default UserModel;
