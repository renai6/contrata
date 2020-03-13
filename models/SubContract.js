const Sequelize = require('sequelize')
const db = require('../config/database')
const OfferPosition = require('./OfferPosition')
const SubContract = db.define('subcontracts', {

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
   
   subContractNr: {
      type: Sequelize.STRING
   },

   name: {
      type: Sequelize.STRING
   },

   projectNr: {
      type: Sequelize.STRING
   },

   offerDate: {
      type: Sequelize.DATE
   },

   approvedDate: {
      type: Sequelize.DATE
   },

   status: {
      type: Sequelize.STRING
   },

   offerAmount: {
      type: Sequelize.INTEGER
   },
   usedAmount: {
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

SubContract.hasMany(OfferPosition, { foreignKey: 'subContractId', as: 'offerPositions' })

module.exports = SubContract