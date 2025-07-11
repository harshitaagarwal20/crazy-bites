import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: 'localhost',
    username: 'root',
    port:3306,
    password:'',
    database:'test',
    dialect: 'mysql'
})

export default sequelize