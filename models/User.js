const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define('users', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true
   },

   email: {
      type: Sequelize.STRING
   },

   password: {
      type: Sequelize.STRING
   },

   userName: {
      type: Sequelize.STRING
   },

   company: {
      type: Sequelize.STRING
   },

   firstName: {
      type: Sequelize.STRING
   },

   lastName: {
      type: Sequelize.STRING
   },

   active: {
      type: Sequelize.BOOLEAN
   },


})

module.exports = User