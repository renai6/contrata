const Sequelize = require('sequelize')
const db = require('../config/sqlSrvDatabse')
const ExactplaceUser = require('./ExactplaceUser')

const TaskComment = db.define('ep_tblpoint_comments', {
    id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    point_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false
    },
    comments: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
    },
    date_commented: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
    },
    comment_trans: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
    },
    // name: {
    //   type: Sequelize.VIRTUAL,
    //   get: async function()  {
    //     const user = await ExactplaceUser.findOne({ where: { id: this.getDataValue('user_id') }, raw: true })
  
    //     return user.first_name + ' ' + user.last_name;
    //   },
    // },
}, {
    tableName: 'ep_tblpoint_comments',
    timestamps: false,
    logging: false
});

TaskComment.belongsTo(ExactplaceUser, {
  as: 'user',
  foreignKey: 'user_id'
})

module.exports = TaskComment
