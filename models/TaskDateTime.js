

const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')

const TaskDateTime = db.define('ep_tbltimelog', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },

    point_id: {
      type: Sequelize.INTEGER,
    },

    start_time: {
      type: Sequelize.DataTypes.STRING(255),
    },

    end_time: {
      type: Sequelize.DataTypes.STRING(255),
    },

    date_received: {
      type: Sequelize.DATE,
    },

}, { 
  tableName: 'ep_tbltimelog',
  logging: false,
  timestamps: false,
})

module.exports = TaskDateTime