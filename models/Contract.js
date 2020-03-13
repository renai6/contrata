const Sequelize = require('sequelize')
const db = require('../config/database')
const OfferPosition = require('./OfferPosition')
const SubContract= require('./SubContract')

const Contract = db.define('contracts', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },

   clientId: {
      type: Sequelize.INTEGER
   },
   
   contractNumber: {
      type: Sequelize.INTEGER
   },
   
   name: {
      type: Sequelize.STRING
   },

   clientName: {
      type: Sequelize.STRING
   },

   startDate: {
      type: Sequelize.DATE
   },

   endDate: {
      type: Sequelize.DATE
   },

   fixedContractAmount: {
      type: Sequelize.INTEGER
   },

   paymentMethod: {
      type: Sequelize.STRING
   },

   usedAmount: {
      type: Sequelize.INTEGER
   },

   fixedPaymentAmount: {
      type: Sequelize.INTEGER
   },

   hourlyRate: {
      type: Sequelize.INTEGER
   },

   travelExpense: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
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

Contract.hasMany(SubContract, { foreignKey: 'contractId', as: 'subContracts' })
Contract.hasMany(OfferPosition, { foreignKey: 'contractId', as: 'offerPositions' })

module.exports = Contract