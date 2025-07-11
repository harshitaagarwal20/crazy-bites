
import {
  Model
} from 'sequelize';

const migration = (sequelize, DataTypes) => {
  class Flat extends Model {
   
    static associate(models) {
      Flat.hasMany(models.FlatUser,{
        foreignKey:'flatId',
        sourceKey:'flatUId',
        as:'flatOwners'
        
      })

      Flat.hasMany(models.Maintenance,{
        foreignKey:'flatId',
        sourceKey:'flatUId',
        as:'flatmaintenance'
        
      })
    }
  }
  Flat.init({
    flatUId:{ 
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    flatNumber: DataTypes.INTEGER,
    floor: DataTypes.INTEGER,
    block: DataTypes.STRING,
    flatType: DataTypes.STRING,
    areapersqfeet:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flat',
  });
  return Flat;
};

export default migration