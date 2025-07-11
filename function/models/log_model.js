// models/userlog.js
export default (sequelize, DataTypes) => {
  const UserLog = sequelize.define('UserLog', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetTable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    changes: {
      type: DataTypes.JSON
    }
  });


  UserLog.associate = function(models) {
    UserLog.belongsTo(models.User, { 
        foreignKey: 'userId' 
    });
  };

  return UserLog;
};
