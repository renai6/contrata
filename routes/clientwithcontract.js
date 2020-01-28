
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const clientWithContract = require('../models/ClientWithContract')

router.get('/', auth, async (req, res) => {

   const { id } = req.params
   try {

      const clients = await clientWithContract.findAll()

      res.send( clients )

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router