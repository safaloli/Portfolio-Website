const {Sequelize} = require('sequelize')
const {DbConfig} = require('./app.config')

const sequelize = new Sequelize(DbConfig.pg.dbName, DbConfig.pg.userName, DbConfig.pg.password, {
    dialect: "postgres",
    logging: false, 
    port: 5433,
})

const sqlInit = async ()=> {
    try{
        await sequelize.authenticate()
        console.log("*** Sql Connection has been established successfully")
    }catch(exception){
        console.error("Error while connecting to sql database", exception)
        throw({code: 500, message: "Error establishing sql connection", status: "SQL_CONNECTION_ERR"})
    }
}

module.exports = {
    sequelize,
    sqlInit
}