const Sequelize = require('sequelize')
const db = require('../config/database')
const Expense = require('./Expense')
const Book = require('./Book')

const OfferPosition = db.define('offerpositions', {

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
   
   subContractId: {
      type: Sequelize.INTEGER
   },

   projectName: {
      type: Sequelize.STRING
   },

   projectNr: {
      type: Sequelize.STRING
   },

   offerName: {
      type: Sequelize.STRING
   },

   offerNr: {
      type: Sequelize.STRING
   },


   offerAmount: {
      type: Sequelize.INTEGER
   },
  
   usedAmount: {
      type: Sequelize.INTEGER
   },
   openHour: {
      type: Sequelize.INTEGER
   },
   openAmount: {
      type: Sequelize.INTEGER
   },
   hours: {
      type: Sequelize.INTEGER
   },

   status: {
      type: Sequelize.STRING
   },

   comments: {
      type: Sequelize.TEXT
   },
   
   archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },

})

OfferPosition.hasMany(Expense, { foreignKey: 'offerPositionId', as: 'expenses' })
OfferPosition.hasMany(Book, { foreignKey: 'offerPositionId', as: 'books' })

module.exports = OfferPosition