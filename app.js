'use strict'
const express = require('express')
const db = require('./config/database')
const mssqldb = require('./config/sqlSrvDatabse')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const port = process.env.PORT || 8085

// Test database connection
db.authenticate()
   .then( _ => console.log('Database Connected'))
   .catch( errors => console.log(`Errors: ${errors}`))

mssqldb.authenticate()
   .then( _ => console.log('MSDatabase Connected'))
   .catch( errors => console.log(`Errors: ${errors}`))

const app = express()
// Cors
app.use(cors())
// BodyparserMiddleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// Set up routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/clients', require('./routes/clients'))
app.use('/api/contracts', require('./routes/contracts'))
app.use('/api/subcontracts', require('./routes/subcontracts'))
app.use('/api/offerpositions', require('./routes/offerpositions'))
app.use('/api/expenses', require('./routes/expenses'))
app.use('/api/books', require('./routes/books'))
app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/offertasks', require('./routes/offertasks'))
app.use('/api/clientwithcontract', require('./routes/clientwithcontract'))

if(process.env.NODE_ENV === 'production') {

   app.use(express.static('./client/build'))

   app.get('*', (req, res) => {
      
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}


// Assign port
app.listen(port, () => console.log(`Running on port ${port} in ${process.env.NODE_ENV} mode`))