
const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')
const Task = require('./Task')

const Project = db.define('tblProjects', {
   PROJECT_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   PROJECT_NAME: {
      type: Sequelize.STRING,
   },

   PROJECT_NR: {
      type: Sequelize.STRING,
   },

   CLIENT_ID: {
      type: Sequelize.INTEGER,
   },

}, { 

   timestamps: false,
})

Project.hasMany(Task, { foreignKey: 'PROJECT_ID', as: 'tasks' })


module.exports = Project