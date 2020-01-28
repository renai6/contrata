
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const Book = require('../models/Book')


router.post('/add', auth, async (req, res) => {

   try {

      const book = await Book.create(req.body)

      return res.status(201).json(book)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/update/:id', auth, async (req, res) => {

   const { id } = req.params
   try {

      const book = await Book.update(req.body, { where: { id }})
      console.log(id)
      return res.status(200).json(book)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router