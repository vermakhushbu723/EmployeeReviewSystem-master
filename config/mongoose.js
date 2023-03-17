const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://GarimaJain:GarimaJain@cluster0.81pstzy.mongodb.net/?retryWrites=true&w=majority')
      

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', ()=>{
    console.log("successfully connected to database : mongoDB");
});

module.exports = mongoose;





// mongodb+srv://Employee_Review:kyVHYg2VWVhOqv3x@cluster0.whteafy.mongodb.net/?retryWrites=true&w=majority',   err => {
//     if(err){console.log(err);}
    // console.log('connected to MongoDB')