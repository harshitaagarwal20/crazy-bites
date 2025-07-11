import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Complaint extends Model {
    static associate(models) {
      
      
    }
  }

  

  Complaint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category: {
        type: DataTypes.ENUM('Plumbing', 'Electricity', 'Security', 'Other'),
        allowNull: false,
      },
    
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Resolved'),
        defaultValue: 'Open',
        allowNull: false,
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    
    },
    {
      sequelize,
      timestamps: true,
    }
  );

  return Complaint;
};
