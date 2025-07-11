export default  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Otp',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
        
        Otp:{
         type:Sequelize.INTEGER,
         allowNull:false
       },
        status:{
         type:Sequelize.ENUM('pending','approved'),
         allowNull:false
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
     await queryInterface.dropTable('Otp',{
      
         SenderId:{
         type:Sequelize.STRING,
         allowNull:false
     },
        RecieverId:{
         type:Sequelize.STRING,
         allowNull:false
       },
     })
  }
};
