const Sequelize = require('sequelize')
const db = require('../config/database')

const clientWithContract = db.define('clientswithcontracts', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING
   },
   contractId: {
      type: Sequelize.INTEGER
   },
   clientId: {
      type: Sequelize.INTEGER
   },

})

module.exports = clientWithContract