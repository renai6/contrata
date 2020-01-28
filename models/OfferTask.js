const Sequelize = require('sequelize')
const db = require('../config/database')

const OfferTask = db.define('tasks', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   TASK_NR: {
      type: Sequelize.INTEGER,
   },

   TASK_ID: {
      type: Sequelize.INTEGER,
   },

   bookId: {
      type: Sequelize.INTEGER,
   },

   SUBPROJECT_ID: {
      type: Sequelize.INTEGER,
   },

   CLIENT_ID: {
      type: Sequelize.INTEGER,
   },

   CONTRACT_ID: {
      type: Sequelize.INTEGER,
   },

   OFFER_ID: {
      type: Sequelize.INTEGER,
   },
   
   CP_EST_HRS_COMPLETION: {
      type: Sequelize.FLOAT,
   },

   totalHours: {
      type: Sequelize.FLOAT,
   },

   IS_ARCHIVED: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },

   DESCRIPTION: {
      type: Sequelize.TEXT
   },

   DEVELOPER_COMMENTS: {
      type: Sequelize.TEXT
   },

   year: {
      type: Sequelize.INTEGER
   },

   month: {
      type: Sequelize.STRING
   },

})

module.exports = OfferTask