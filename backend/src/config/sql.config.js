const fs = require('fs');
const {DbConfig} = require('./app.config.js')

module.exports = {
  development: {
    username: DbConfig.pg.userName,
    password: DbConfig.pg.password,
    database: DbConfig.pg.dbName,
    host: '127.0.0.1',
    port: 3303,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: DbConfig.pg.userName,
    password: DbConfig.pg.password,
    database: DbConfig.pg.dbName,
    host: '127.0.0.1',
    port: 3303,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: DbConfig.pg.userName,
    password: DbConfig.pg.password,
    database: DbConfig.pg.dbName,
    host: '127.0.0.1',
    port: 3303,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};