const {DataTypes} =  require('sequelize') // Aqui, o código está importando o objeto DataTypes do Sequelize. DataTypes é uma coleção de tipos de dados que podem ser usados para definir os campos (colunas) em um modelo Sequelize.

const db = require ('../db/conn') // O código está importando o objeto db que representa a conexão com o banco de dados


const User = require ('./User')  


const Tought = db.define('Tought',{
    title : {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }, // Neste trecho, está sendo definido o modelo Tought com um campo chamado title. O campo title é do tipo STRING , uma string no banco de dados, e é configurado para não aceitar valores nulos (allowNull: false) e ser obrigatório (require: true).
})

Tought.belongsTo(User)
User.hasMany(Tought)   // Um pensamento (Tought) pertence a um usuário (User), e um usuário pode ter muitos pensamentos. Isso sugere que existe uma chave estrangeira no modelo Tought que faz referência à tabela Users no banco de dados.

module.exports = Tought