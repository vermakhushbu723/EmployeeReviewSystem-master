const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        require:true 
    },
    password:{
        type:String,
        require:true
    }
  
   

  

    





    

},{timestamps:true})

const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin