const Sequelize = require('sequelize')

require('dotenv').config()

instance = new Sequelize("exactplace", "root", "", {
  //  host: process.env.HOST,
  host: 'localhost',
  dialect: "mysql",
  port: 3306,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

module.exports = instance