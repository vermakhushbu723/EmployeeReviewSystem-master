const express=require('express')
const router=express.Router()

router.get('/',function(req,res){
    res.render('home')
})

router.use('/admin',require('./admin'))
router.use('/employee',require('./employee'))


module.exports=router