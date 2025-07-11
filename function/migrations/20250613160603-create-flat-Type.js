'use strict';

const migration = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Flats', 'flatType', {
      type: Sequelize.ENUM("1BHK","2BHK","3BHK"),
      allowNull: false,
      
    });
  },

  async down (queryInterface, Sequelize) {
    
 await queryInterface.dropColumn('Flats', 'structure', {
      type: Sequelize.ENUM("1BHK","2BHK","3BHK"),
      allowNull: false,
      })
    }
  };
  
  export default migration;