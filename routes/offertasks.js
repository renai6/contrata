
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const OfferTask = require('../models/OfferTask')
const Book = require('../models/Book')

router.post('/add', auth, async (req, res) => {

   try {
      
      const _offerTask = await OfferTask.bulkCreate(req.body)

      return res.status(201).json(_offerTask)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})


router.delete('/archive/:id', auth, async (req, res) => {

   const { id } = req.params
   
   try {
     
      const offerTask = await OfferTask.destroy({ where: { id } })

      return res.status(202).json(offerTask)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router