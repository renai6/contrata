
"use strict"
const express = require('express')
const path = require('path')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const db = require('../config/database')
const User = require('../models/User')

//  Register
router.post('/register', [

      check('userName', 'Username is a required field').not().isEmpty(),
      check('email', 'Email is a required field').not().isEmpty().isEmail().normalizeEmail(),
      check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
      check('firstName', 'First name is a required field').not().isEmpty(),
      check('lastName', 'Last name is a required field').not().isEmpty(),

   ], (req, res) => {

      const errors = validationResult(req)

      if(!errors.isEmpty()) {

         return res.status(422).json(errors.array())
      }

      const {userName, password, email, firstName, lastName, company} = req.body

      User.findOne({ where: {userName} })
         .then(user => {

            if(user) {
               return res.status(400).json({msg: "User already exist"})
            }

            

            bcrypt.genSalt(10, (err, salt) => {

               bcrypt.hash(password, salt, (err, hash) => {
                  if(err) throw err;

                  const hashedPassword = hash

                  User.create({
                     email, 
                     password: hashedPassword,
                     userName,
                     firstName,
                     lastName,
                     company,
                  }).then(newUser => {
      
                        res.send(newUser)
                     })
                     .catch(err => {
                        
                        return res.status(500).json({msg: "Server Error"})
                     })
      
               })
            })

           
         })
         .catch(err => {

            return res.status(500).json({msg: "Server Error"})
         })
   })

module.exports = router