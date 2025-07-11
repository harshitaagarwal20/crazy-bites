'use strict';


const migration = {
  async up (queryInterface, Sequelize) {

  
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.STRING,
      allowNull: false,
      
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

export default migration
