const Sequelize = require('sequelize')

require('dotenv').config()

instance = new Sequelize("test01-project-tool", "projectUser", "ND659p8TuXnrS6yQ", {
   host: process.env.HOST,
   dialect: "mssql",
   port: 1433,
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   },
})

module.exports = instance