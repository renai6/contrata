
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const SubContract = require('../models/SubContract')
const Contract = require('../models/Contract')


router.post('/add', auth, async (req, res) => {

   const { clientId, contractId } = req.body
   try {

      const subcontract = await SubContract.create(req.body)
      const contract = await Contract.findByPk(parseInt(contractId))

      const _subContract = {
         subContractNr: parseInt(`${clientId}${contractId}${subcontract.id}`)
      }
      
      await SubContract.update(_subContract, { where: { id:subcontract.id }})

      await Contract.update({ usedAmount: contract.usedAmount + parseInt(req.body.offerAmount) }, { where: { id: contractId }})

      subcontract.subContractNr = _subContract.subContractNr

      return res.status(201).json(subcontract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/update/:id', auth, async (req, res) => {

   const { id } = req.params
   
   try {

      const contract = await SubContract.update(req.body, { where: { id }})

      return res.status(200).json(contract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router