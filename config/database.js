
const Sequelize = require('sequelize')

require('dotenv').config()

let instance

switch (process.env.NODE_ENV) {
   case 'production':
      instance = new Sequelize('contrata', 'exact', '2GrD7M7KKPZCkCA6', {
        host: 'exactconstruct.synology.me',
        dialect: 'mysql',
        port: 3307,
        retry  : {
          match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
          ],
          max  : 5
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      })

      break;

   case 'development':

      instance = new Sequelize('contrata', 'root', '', {
        host: 'localhost',
      // instance = new Sequelize('contrata', 'exact', '2GrD7M7KKPZCkCA6', {
      //   host: 'exactconstruct.synology.me',
        dialect: 'mysql',
        port: 3307,
        retry  : {
          match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
          ],
          max  : 5
        },
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      })


      break;

   default:

      instance = new Sequelize('contrata', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      })

      break;
}


module.exports = instance