import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Notice extends Model {
    static associate(models) {
     
      Notice.belongsTo(models.FlatUser, {
        foreignKey: 'userId',
        targetKey:'UserId',
  
      });
    }
  }

  Notice.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM('General', 'Urgent', 'Event', 'Maintenance'),
        allowNull: false,
      },

      isPinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId:{
        type: DataTypes.STRING,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: 'Notice',
      tableName: 'Notices',
      timestamps: true, // adds createdAt and updatedAt automatically
    }
  );

  return Notice;
};
