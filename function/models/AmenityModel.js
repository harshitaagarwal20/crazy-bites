// models/delivery.js
export default (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    name: DataTypes.STRING,
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isActive: {
        type: DataTypes.STRING,
        allowNull: false
      },
      societyId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
  });

  Amenity.associate = function(models) {
    Amenity.belongsTo(models.Society, { foreignKey: 'societyId' });
  };

  return Amenity;
};
