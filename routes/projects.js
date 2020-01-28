
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const db = require('../config/sqlSrvDatabse')
const Project = require('../models/Project')


router.get('/', async (req, res) => {

   try {

      
      const project = await Project.findAll({
         where: {
            id: 125,

         },
         include: [{
            model: TaskDateTime,
            as: 'time',
            required: true
         }]
      })

      res.send( project )

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }
})

module.exports = router