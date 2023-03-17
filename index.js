const express=require('express')
// for deployment
const PORT=process.env.PORT||8000; 
const app=express()
const mongoose=require('./config/mongoose')
const session=require('express-session')
require('dotenv').config()


const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'garimaJain',
    resave: false, 
    saveUninitialized: false
}));

app.use(express.urlencoded({extended:true}))
// app.use(dotenv)

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));
app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes/index.js'))

app.listen(PORT,function(err){
    if(err){
        console.log("error in runing the port server ",err )
    }

    console.log("hey your port is runing .....",PORT)
})