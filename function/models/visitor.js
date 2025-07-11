import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Visitor extends Model {
    static associate(models) {
      // Associations
      Visitor.belongsTo(models.FlatUser, {
        foreignKey: 'flatId',
        targetKey:'flatId',
  
      });

     
    }
  }

  Visitor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recieverId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      outTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      flatId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status:{
         type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    {
      sequelize,
      modelName: 'Visitor',
      tableName: 'Visitors',
      timestamps: true,
    }
  );

  return Visitor;
};
