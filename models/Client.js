const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')

const Client = db.define('tblClients', {
   CLIENT_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   CLIENT_NAME: {
      type: Sequelize.STRING
   },

}, { 

   timestamps: false,
})

module.exports = Client