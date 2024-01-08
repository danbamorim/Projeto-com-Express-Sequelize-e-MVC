const{ Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts3', 'root','',{
    host: 'localhost',
    dialect: 'mysql'
})



try{
    sequelize.authenticate()
    console.log('CONECTAMOS')
}catch(error){
    console.log('Não foi possivel conectar: ${error}')
}

module.exports = sequelize