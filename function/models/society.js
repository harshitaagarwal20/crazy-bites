
import {
  Model,
  UUIDV4
} from 'sequelize';

const migration = (sequelize, DataTypes) => {
  class Society extends Model {
   
    static associate(models) {
      
      Society.hasMany(models.User,{
        foreignKey:'licenceNo',
        sourceKey:'licenceNo',
        as:'flatOwners'
      })

      
      Society.hasMany(models.Transaction, {
  foreignKey: 'societyId',
  sourceKey: 'id'
});

     Society.hasMany(models.Maintenance, {
  foreignKey: 'societyId',
  sourceKey: 'id'
});

  
    }
  }
  Society.init({
    id:{ 
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      licenceNo:{
        type:DataTypes.STRING,
        allowNull:false
      },
     
      
    
      address:{
        type:DataTypes.STRING,
        allowNull:false
      },
      city:{
        type:DataTypes.STRING,
        allowNull:false
      }
      ,
      pinCode:{
        type:DataTypes.STRING,
        allowNull:true
      },
      maintenanceCostPerSqft:{
         type: DataTypes.INTEGER,
        allowNull: false
      },
      
  }, {
    sequelize,
    timestamps:true,
    modelName: 'Society',
    tableName: 'Society'
  });
  return Society;
};

export default migration