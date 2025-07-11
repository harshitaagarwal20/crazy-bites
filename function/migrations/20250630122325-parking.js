

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parkings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      parkingNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      vehicleNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicleType: {
        type: Sequelize.ENUM('car', 'bike', 'scooty'),
        allowNull: true
      },
      ownerName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      flatId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('occupied', 'vacant', 'reserved'),
        defaultValue: 'vacant',
        allowNull: false
      },
      isVisitorSlot: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Parkings');
  }
};
