'use strict';
import {
  Model
} from 'sequelize';
const migration = (sequelize, DataTypes) => {
  class FlatUser extends Model {
   
    static associate(models) {
      FlatUser.belongsTo(models.User, {
  foreignKey: 'UserId'  ,
  sourceKey: 'id'
});

FlatUser.belongsTo(models.Flat, {
  foreignKey: 'flatId',  
  targetKey: 'flatUId',
  as: 'flat'
});


      FlatUser.hasMany(models.Visitor,{
        foreignKey:'flatId',
        sourceKey:'flatId'
      })

       
    }
  }
  FlatUser.init({
    flatId: DataTypes.UUID,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FlatUser',
  });
  return FlatUser;
};

export default migration