'use strict'
const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * @IMPORTANT
 * @PUBLICKEY
 * DONT SHARE TO ANYONE
 */

const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'utf8')

// Database
const db = require('../config/database')
const User = require('../models/User')

/**
 * @route api/auth
 * @desc Authorize users
 * @access Private
 */
router.post('/', [

      check('userName', 'Username is a required field').not().isEmpty(),
      check('password', 'Please provied a password').not().isEmpty()

   ], (req, res) => {

      const errors = validationResult(req)

      if(!errors.isEmpty()) {

         return res.status(422).json(errors.array())
      }

      const {userName, password} = req.body

      User.findOne({ where: {userName} })
         .then(user => {

            if(!user) {
               return res.status(400).json({msg: "User does not exist", errorType: 1})
            }
            // Compare password
            bcrypt.compare(password, user.password)
               .then(isMatch => {

                  if(!isMatch) {
                     return res.status(400).json({msg: 'Wrong password', errorType: 2})
                  }

                  const issuer  = 'Exactconstruct Synology'
                  const subject  = 'raffi.muloc@exact-construct.ch'
                  const audience  = 'http://localhost:8080'

                  const userPayload = {
                     id: user.id,
                     email: user.email
                  }

                  const signOptions = {
                     issuer,
                     subject,
                     audience,
                     expiresIn:  "8h",
                     algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
                  };

                  // Sign in JWT
                  try {

                     const token = jwt.sign(userPayload, privateKey, signOptions)

                     res.send({
                        token,
                        user: {
                           id: user.id,
                           firstName: user.firstName,
                           lastName: user.lastName,
                           email: user.email,
                           company: user.company
                        }
                     })
                  } catch (error) {
                     
                     console.log(error)

                     return res.status(500).json({message: "Server Error"})
                  }
                  
                     
               })
         })
         .catch( errors => console.log(errors) )
   })

/**
 * @route api/auth/user
 * @desc GET AUTHENTICATED USER
 * @access PRIVATE
 */


router.get('/user', auth, (req, res) => {

   User.findOne({ 

      where: { id: req.user.id},
      attributes: {
         exclude: ['password']
     }
   })
   .then((user) => {
      
      res.send(user)
    
   })
   .catch(err => {
      console.log(err)
      res.status(500).json({msg: "Server Error"})
   })
})
   

module.exports = router