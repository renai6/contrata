const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')
const TaskDateTime = require('./TaskDateTime')

const Task = db.define('tblTasks', {
   TASK_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   PROJECT_ID: {
      type: Sequelize.INTEGER,
   },

   TASK_NR: {
      type: Sequelize.INTEGER,
   },

   SUBPROJECT_ID: {
      type: Sequelize.INTEGER,
   },

   INVOICE_ID: {
      type: Sequelize.INTEGER,
   },

   OFFER_ID: {
      type: Sequelize.INTEGER,
   },
   
   CP_EST_HRS_COMPLETION: {
      type: Sequelize.FLOAT,
   },

   IS_ARCHIVED: {
      type: Sequelize.BOOLEAN
   },

   IS_MERGE: {
      type: Sequelize.INTEGER
   },

   TASK_STATUS: {
      type: Sequelize.STRING
   },

   DESCRIPTION: {
      type: Sequelize.STRING
   },

   DEVELOPER_COMMENTS: {
      type: Sequelize.STRING
   },

}, { 

   timestamps: false,
})

Task.hasMany(TaskDateTime, { foreignKey: 'TASK_ID', as: 'time' })

module.exports = Task