export default {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Society',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      licenceNo:{
        type:Sequelize.TEXT,
        
      },
      roleId:{
         type:Sequelize.STRING,
        allowNull:false
      },
      address:{
        type:Sequelize.STRING,
        allowNull:false
      },
      city:{
        type:Sequelize.STRING,
        allowNull:false
      }
      ,
      pinCode:{
        type:Sequelize.STRING,
        allowNull:true
      },
      maintenanceCostPerSqft:{
         type: Sequelize.INTEGER,
        allowNull: false
      },

      

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Optional but safe
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Optional but safe
      }
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Society',{
      licenceNo:{
        type:Sequelize.TEXT,
        
      },
      roleId:{
         type:Sequelize.STRING,
        allowNull:false
      },
    })
  }
};
