
const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')
const Task = require('./Task')

const Project = db.define('ep_tblproject', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   proj_name: {
      type: Sequelize.STRING,
   },

   proj_nr: {
      type: Sequelize.STRING,
   },

   client_id: {
      type: Sequelize.INTEGER,
   },

}, {
  tableName: 'ep_tblproject',
  timestamps: false,
  logging: false
})

Project.hasMany(Task, { foreignKey: 'proj_id', as: 'tasks' })


module.exports = Project