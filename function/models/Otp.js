import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Otp extends Model {
  }
   
    
    
  

  Otp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
      },
      
      Otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique:true
      },

     
    },
    {
      sequelize,
      modelName: 'Otp',
      tableName: 'Otp',
      timestamps: true, 
    }
  );

  return Otp;
};
