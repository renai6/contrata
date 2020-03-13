const Sequelize = require('sequelize')
const db = require('../config/database')

const OfferTask = require('./OfferTask')
const Book = db.define('books', {

   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
 
   month: {
      type: Sequelize.STRING
   },
   
   year: {
      type: Sequelize.INTEGER
   },

   hours: {
      type: Sequelize.FLOAT
   },

   amount: {
      type: Sequelize.INTEGER
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

   offerPositionId: {
      type: Sequelize.INTEGER
   },

   bookNumber: {
      type: Sequelize.INTEGER
   },
   
   archived: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },

}, {
  logging: false
})


Book.hasMany(OfferTask, { foreignKey: 'bookId', as: 'offerTasks' })

module.exports = Book