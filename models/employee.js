const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
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
        require:true,
        
        
    },
    designation:{
        type:String,
        default:'Junior'
        

    },
    contactNo:{
        type:Number

    },
    is_admin:{
        type:Boolean,
        default:false

    },
    feedbacks:[
        {
            
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    toReview:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Employee'
        }
        
    ]
},{timestamps:true})


const Employee=mongoose.model('Employee',employeeSchema)
module.exports=Employee