const express=require('express')
const router=express.Router()
const employeeController=require('../controller/employeeController')


// --------------------employee authentication action-------------------

router.get('/login',employeeController.loginView)
router.post('/create-session',employeeController.createSession)


// // ---------------------employee dashboard action -----------------------
router.get('/dashboard/:id',employeeController.dashboard)
router.post('/feedback/:fId/:tId',employeeController.feedback)
router.get('/taskList/:id',employeeController.taskList)
router.get('/viewFeedback/:id',employeeController.viewFeedback)
// router.get('/feedbackRatings',employeeController.personalRates)
router.get('/profile/:id',employeeController.profile)


module.exports=router