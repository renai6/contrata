
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/sqlSrvDatabse')
const Client = require('../models/Client')

router.get('/', auth, async (req, res) => {

   try {

      const clients = await Client.findAll()

      res.send( clients )

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }
})

module.exports = router