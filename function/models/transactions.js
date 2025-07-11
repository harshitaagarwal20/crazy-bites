import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Society, {
        foreignKey: 'societyId',
        targetKey: 'id',
      });
    }
  }

  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    societyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize, 
    modelName: 'Transaction',
    tableName: 'Transactions',
    timestamps: true
  });

  return Transaction;
};
