const nodeMailer=require('../config/nodemailer');

module.exports.joiningEmail=(user)=>{
    console.log('user details',user);
    nodeMailer.transporter.sendMail({
        from:'garimaj334@gmail.com',
        to:user.email,
        subject:"Welcome to Coding Ninjas",
        html:`<h1>we are very excited to welcome you in our company ${user.name}</h1><h3> you can login to our company employee page with your credentials as </h3>
        <h4> Name : ${user.name}</h4>
        <h4> Email: ${user.email}</h4>
        <h4> Password: ${user.password} </h4>
        `
    
    },(err,info)=>{
        if(err){
            console.log("err in sending the email:",err);
            return ;
        }
        console.log('Message sent !! ',info)

    })
}