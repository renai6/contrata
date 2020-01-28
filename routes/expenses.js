
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const Expense = require('../models/Expense')


router.post('/add', auth, async (req, res) => {

   try {

      const expense = await Expense.create(req.body)

      return res.status(201).json(expense)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/update/:id', auth, async (req, res) => {

   const { id } = req.params
   try {

      const contract = await Expense.update(req.body, { where: { id }})

      return res.status(200).json(contract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router