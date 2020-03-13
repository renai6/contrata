const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')

const ExactplaceUser = db.define('ep_tblusers', {
    id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: false
    },
    last_name: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: false
    },
}, {
  tableName: 'ep_tblusers',
  underscored: true,
  timestamps: false,
  logging: false
});

module.exports = ExactplaceUser
