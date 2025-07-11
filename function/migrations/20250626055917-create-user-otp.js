export default {
  async up(queryInterface, Sequelize) {
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'otp', {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'expiry', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
