const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')

const Client = db.define('ep_tblclients', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   clientname: {
      type: Sequelize.STRING
   },

}, { 
   timestamps: false,
   logging: false
})

module.exports = Client