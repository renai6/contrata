const Sequelize = require('sequelize')
const db = require('../config/database')

const OfferPosition = db.define('expenses', {

   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
 
   clientId: {
      type: Sequelize.INTEGER
   },

   contractId: {
      type: Sequelize.INTEGER
   },
   
   offerPositionId: {
      type: Sequelize.INTEGER
   },

   expenseAmount: {
      type: Sequelize.INTEGER
   },

   travelTime: {
      type: Sequelize.STRING
   },

   hourlyRate: {
      type: Sequelize.INTEGER
   },

   comments: {
      type: Sequelize.TEXT
   },

   archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },

}, {
  logging: false
})

module.exports = OfferPosition