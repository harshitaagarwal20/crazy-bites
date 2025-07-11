export default {
  async up(queryInterface, Sequelize) {
    

    await queryInterface.addColumn('Transactions', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  async down(queryInterface, Sequelize) {
    
  }
};
