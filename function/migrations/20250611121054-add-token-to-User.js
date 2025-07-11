
'use strict';

const Migration = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users',  {
      type: Sequelize.STRING,
      allowNull: false, 
    });
  },

}

export default Migration;
