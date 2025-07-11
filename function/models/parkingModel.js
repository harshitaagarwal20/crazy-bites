import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Parking extends Model {
    static associate(models) {
      Parking.belongsTo(models.FlatUser, {
        foreignKey: 'flatId',
        targetKey: 'flatId',
      });
    }
  }

  Parking.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parkingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicleType: {
      type: DataTypes.ENUM('car', 'bike', 'scooty'),
      allowNull: true,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('occupied', 'vacant', 'reserved'),
      defaultValue: 'vacant',
    },
    isVisitorSlot: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize, 
    modelName: 'Parking',
    tableName: 'Parkings',
    timestamps: true
  });

  return Parking;
};
