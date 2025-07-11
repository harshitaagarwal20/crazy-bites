export default  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
       societyId:{
         type:Sequelize.STRING,
         allowNull:false
       },
        month:{
         type:Sequelize.STRING,
         allowNull:false
       },
        amount:{
         type:Sequelize.INTEGER,
         allowNull:false
       },
        dueDate:{
         type:Sequelize.DATE,
         allowNull:false
       },
        status:{
         type:Sequelize.ENUM("Pending","Paid"),
         allowNull:false
       },
       paymentdate:{
         type:Sequelize.DATE,
         allowNull:false
       },
      paymentMethod:{
         type:Sequelize.STRING,
         allowNull:false
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
    await queryInterface.dropTable('transactions',{
      LicenceNo:{
         type:Sequelize.STRING,
         allowNull:false
      }
    })
  }
};
