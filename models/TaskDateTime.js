

const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')

const TaskDateTime = db.define('tblTaskDateTimes', {
   ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   TASK_ID: {
      type: Sequelize.INTEGER,
   },

   TIME_ELAPSED: {
      type: Sequelize.STRING,
   },

   DATE_LOGGED: {
      type: Sequelize.DATE,
   },

}, { 

   timestamps: false,
})

module.exports = TaskDateTime