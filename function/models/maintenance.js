import { Model, DataTypes } from 'sequelize';

const maintenance = (sequelize) => {
  class Maintenance extends Model {
    static associate(models) {
      Maintenance.belongsTo(models.FlatUser, {
        foreignKey: 'flatId',
        targetKey: 'flatId',
        as: 'flat',
      });
  
      Maintenance.belongsTo(models.Society, {
        foreignKey: 'societyId',
        targetKey: 'id',
        
      });

    }
  }

  Maintenance.init(
    {
      flatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      societyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Maintenance',
      tableName: 'Maintenances',
      timestamps: true,
    }
  );

  return Maintenance;
};

export default maintenance;
