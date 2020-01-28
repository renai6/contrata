
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const SubContract = require('../models/SubContract')
const OfferPosition = require('../models/OfferPosition')


router.post('/add', auth, async (req, res) => {

   try {

      const offerPosition = await OfferPosition.create(req.body)

      const subContract = await SubContract.findByPk(parseInt(offerPosition.subContractId))

      const _offerPosition = {
         offerNr: parseInt(`${req.body.offerNr}${offerPosition.id}`)
      }


      await OfferPosition.update(_offerPosition, { where: { id:offerPosition.id }})
      await SubContract.update({ usedAmount: parseInt(subContract.usedAmount) + parseInt(offerPosition.offerAmount) }, { where: { id: offerPosition.subContractId }})

      offerPosition.offerNr = _offerPosition.offerNr

      return res.status(201).json(offerPosition)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/update/:id', auth, async (req, res) => {

   const { id } = req.params

   try {

      const offerPosition = await OfferPosition.update(req.body, { where: { id: parseInt(id) } })

      return res.status(200).json(offerPosition)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router