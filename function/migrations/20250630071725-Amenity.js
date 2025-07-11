export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Amenities', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.STRING,
        allowNull: false
      },
      societyId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('deliveries',{
      
    })
  }
};
