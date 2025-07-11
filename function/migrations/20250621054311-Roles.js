export default  {
  async up (queryInterface, Sequelize) {
    await queryInterface.createDatabase('Roles',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      roleUId:{
        type:Sequelize.UUID,
        default:Sequelize.UUIDV4,
        allowNull:true
      },
      Role:{
        type:Sequelize.ENUM('Super-Admin','Admin','Staff','User'),
        allowNull:true
      }
    })
  },

  async down (queryInterface, Sequelize) {
  
  }
};
