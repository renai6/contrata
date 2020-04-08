
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/database')
const Contract = require('../models/Contract')
const SubContract = require('../models/SubContract')
const OfferPosition = require('../models/OfferPosition')
const Expense = require('../models/Expense')
const Invoice = require('../models/Book')
const OfferTask = require('../models/OfferTask')
const clientWithContract = require('../models/ClientWithContract')

router.get('/:id', auth, async (req, res) => {

   const { id } = req.params
   try {

      const contract = await Contract
            .findAll({ 
               
               where: {
                  archived: 0,
                  clientId: id
               },
               
               include:  [
                  {
                     model: SubContract,
                     as: 'subContracts',
                     required: false,
                     where: {
                        archived: 0
                     },
                     
                     include: [
                        {
                            
                           model: OfferPosition,
                           as: 'offerPositions',
                           required: false,
                           where: {
                              archived: 0
                           },
                           include: [
                              {
                                 model: Expense,
                                 as: 'expenses',
                                 required: false,
                                 where: {
                                    archived: 0
                                 },
                                
                              }, {
                                 model: Invoice,
                                 as: 'books',
                                 required: false,
                                 where: {
                                    archived: 0
                                 },

                                 include: [
                                    {
                                       model: OfferTask,
                                       as: 'offerTasks',
                                       required: false,
                                       where: {
                                          IS_ARCHIVED: 0
                                       },
                                      
                                    }
                                 ]
                                
                              }
                              
                           ]
                        }
                       
                     ]
                  }
               ],
              
            })

      res.send( contract )

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.post('/add', auth, async (req, res) => {

   const { clientId } = req.body
   try {

      const contract = await Contract.create(req.body)

      const foundClient = await clientWithContract.findOne({ where: { clientId } })

      if(!foundClient) {

         const withContract = await clientWithContract.create({
            name: contract.clientName,
            contractId: contract.id,
            clientId
         })
      }

      return res.status(201).json(contract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/update/:id', auth, async (req, res) => {

   const { id } = req.params
   try {

      const contract = await Contract.update(req.body, { where: { id }})

      return res.status(200).json(contract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

router.put('/archive/:id', auth, async (req, res) => {

   const { id } = req.params
   try {

      const contract = await Contract.update(req.body, { where: { id }})

      return res.status(200).json(contract)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router