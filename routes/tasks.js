
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const auth = require('../middleware/auth')
const db = require('../config/sqlSrvDatabse')
const Task = require('../models/Task')
const TaskDateTime = require('../models/TaskDateTime')
const Project = require('../models/Project')


router.get('/', async (req, res) => {

   const tasks = []

   try {

      const projects = await Project.findAll({
         where: {
            PROJECT_NR: {
               [Op.like]: '2%'
            }
         },
         include: [{
            model: Task,
            as: 'tasks',
            required: true,
            where: { IS_MERGE: null, TASK_STATUS: 'Closed' },
            include: [{
               model: TaskDateTime,
               as: 'time',
               required: true
            }]
         }]
      })

      // projects.forEach(project => tasks.push(...project.tasks))
      return res.json(projects)

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }
})

router.put('/update', auth, async (req, res) => {
   
   try {

      const _data = req.body
      
      for (const item of _data) {
         
         const {TASK_ID, ...rest} = item

         await Task.update(rest, { where: { TASK_ID }})
      }


      return res.send('Done')

   } catch (error) {

      return res.status(500).json({msg: `Server Error: ${error}`})
   }

})

module.exports = router


