const {DataTypes} =  require('sequelize')

const db = require ('../db/conn')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true
    },
   email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
})
 

module.exports = User


// User usando o Sequelize, que representa a estrutura de uma tabela no banco de dados. O modelo possui três campos: name, email e password, todos do tipo STRING e obrigatórios. Essa estrutura facilita a interação com o banco de dados ao realizar operações CRUD (Create, Read, Update, Delete) relacionadas aos usuários em um aplicativo Node.js.