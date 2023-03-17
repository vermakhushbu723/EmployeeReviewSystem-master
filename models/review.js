const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    feedback:{
        type:String,
        required:true
    },
    reviewBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    reviewFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'

    }
},{timestamps:true})

const Review=mongoose.model('Review',reviewSchema)
module.exports=Review