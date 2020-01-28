const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')
const TaskDateTime = require('./TaskDateTime')

const Task = db.define('ep_tblpoint', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   proj_id: {
      type: Sequelize.INTEGER,
   },

   point_nr: {
      type: Sequelize.INTEGER,
   },

   invoice_id: {
      type: Sequelize.INTEGER,
   },

   offer_id: {
      type: Sequelize.INTEGER,
   },
   
   time_estimate: {
      type: Sequelize.FLOAT,
   },

   is_archived: {
      type: Sequelize.BOOLEAN
   },

   is_merge: {
      type: Sequelize.INTEGER
   },

   status: {
      type: Sequelize.STRING
   },

   instructions: {
      type: Sequelize.STRING
   },

}, { 
  tableName: 'ep_tblpoint',
  logging: false,
  timestamps: false,
})

Task.hasMany(TaskDateTime, { foreignKey: 'point_id', as: 'time' })

module.exports = Task