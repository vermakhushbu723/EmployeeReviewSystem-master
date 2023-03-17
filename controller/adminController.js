const Admin=require('../models/admin.js')
const Employee=require('../models/employee')
const employeeJoiningEmail=require('../mailers/addEmployeeEmail')
const Feedback=require('../models/review')



// this function will render the admin signup ejs file
module.exports.signUp_view=async function(req,res){

    res.render('sign-up')
}

// this function is to create the admin db

module.exports.createAdmin=async function(req,res){
    console.log(req.body)
    // checks to confirm the details given by admin
    if (req.body.password != req.body.confirm_password){
        // req.flash('error', 'Passwords do not match');
        console.log('hey passwords not match')
        req.flash('error',"Hey !! Your Passwords Does Not Match")
        return res.redirect('back');
    }

    Admin.findOne({email: req.body.email}, function(err, user){
        // used flash notification for the error if any error occur in b/w the process
        if(err){console.log(err)}
        if (!user){
            // it creates the admin 
            Admin.create(req.body, function(err, user){
                if(err){
                    // req.flash('error', err);
                    console.log(err);
                    return
                }

                req.flash('success',"Registered Successfully")

                return res.redirect('/admin/login');
            })
        }else{
            // req.flash('success', 'You have signed up, login to continue!');
            console.log("You have signed up, login to continue!");
            req.flash('success',"You are already Registered")
            return res.redirect('back');
        }

    });
    

}
// it render the login page view 
module.exports.loginPage = function(req,res){
    res.render('sign-in')
    
};

// it cretes the session for the admin 
module.exports.createSession=async function(req,res){

    //  it is an mannual authentication ⛔⛔here i have to use passport and it session
    const user=await Admin.findOne({email:req.body.email})
    // console.log(user)
    if (user){

        console.log('signed in ')
        req.flash('success',"Logged in successfully")
        res.render('admin')

    }
    else{
        console.log('admin does not exists');
        res.redirect('/admin/sign-up')
    }


}

// from this controller the admin can also add employee to the company 

module.exports.addEmployee=function(req,res){
    // this will render the page through which admin is good to add employee
    
    res.render('admin_add_employee')

}

module.exports.addEmployeeToDatabase=async function(req,res){
    // through this action the admin is creating the employee from his end 

    const user=await Employee.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.name
    })

    if (user){
        console.log('Employee created');
        req.flash('success',"Employee Created")
        employeeJoiningEmail.joiningEmail(user)


    }
    res.render('admin')



}

// this controller for giving all the employee details to the employee and render all the current employee list
module.exports.viewEmployee=async function(req,res){

    const employee=await Employee.find({})
    res.render('allEmployee',{
        employee:employee
    })

}

// in this admin will recieve all the list reviews that the employee has commented over other employee
module.exports.listFeedback=async function(req,res){

    const reviews=await Feedback.find({}).populate('reviewBy').populate('reviewFor')

    res.render('feedbacks',{
        reviews:reviews
    })

}

// from this action admin is updating the employee  info
module.exports.updateEmployee=async function(req,res){
    var emp=await Employee.findById(req.params.id)
    if(!emp){req.flash('error',"Requested employee does not exists"); res.redirect('back')}
    console.log(req.body)
    // it is ternary operator i have used for the choice of the employee to make admin 
    const is_admin=req.body.isAdmin=="yes"?true:false
// ----👎🏿👎🏿👎🏿ad dekh isme bhi mene do ccase kr diye ek to tb jb employee already admin h tb uski admin se remove krna 
// ---👎🏿👎🏿 ek tb jb employe admin nhi h tb avi tuje vo dono case handle krne h 

    // when the req.body gives the yes value for employee to be admin then we have to make that employee db in the admin Database also
    if(is_admin){
        // in this condition we also have to make that employee data to admin db for future use
        const admin =await Admin.create({
            name:emp.name,
            email:emp.email,
            password:emp.password

        }) 
    }
    const removeEmployee=req.body.removeEmployee=="yes"?true:false
    // this case is when edmin wants to remove that employee from the company

    if(removeEmployee){
        console.log(emp);
        // this for employeee db present in db
        await Feedback.findOneAndDelete({reviewBy:req.params.id})
        await Feedback.findOneAndDelete({reviewFor:req.params.id})
        await Employee.deleteOne({_id:req.params.id})
        // this for in past at some time the admin has made him an admin then this employee should be remove from admin db also 
       
        await Admin.findOneAndDelete({email:emp.email})

        req.flash('success',"Employee Has been removed")
        return res.redirect('/admin/viewEmployee')

    }
    
    if(emp){
        // now if employee is not being removed only its information is changing the updating the employee data
        emp=await Employee.findByIdAndUpdate(req.params.id,{$set:{
            designation:req.body.designation,
            contactNo:req.body.phone,
            is_admin:is_admin
            

        }})
        if(emp){await emp.save()}
        req.flash('success',"employee Information updated")
        res.redirect('/admin/viewEmployee')
        
    }
}
// this is conrolls for the tak to review an employee or a list of employee through the opened profile employee
module.exports.assign2Employee=async function(req,res){
    console.log(req.body)

    const arr=req.body.name
    // firstly we rae fetching that for the particular emp id passed in params
    const employee=await Employee.findById(req.params.id)
    if(employee){
        // this case is when the admin wants to assign multiple employee names to review for
    if(arr.length!=undefined){
        for(var e of arr){
            // running over the list of employee and filling its info in the toReview field of the employee

            const emp=await Employee.findOne({email:e})
            
                employee.toReview.push(emp)
                // employee.save()
                
            }
            // saving the changes made to this
            employee.save()
            req.flash('success',"Task Assigned to Employee")
            res.redirect('/admin/viewEmployee')

        }        
    else{
        // this is the case when admin wants to take review of only one employee 

        Employee.findOne({email:req.body.name},function(err,emp){
            if(err){console.log(err)}
            // similar to oprevious that finding the given employee and the pushing its info in the toReview array of the employee schema
            employee.toReview.push(emp)
            employee.save();
            req.flash('success',"Task Assigned to Employee")
            res.redirect('/admin/viewEmployee')

    })    
}
    }else{
        // handling the case if the passed params id employee not exists
        res.send("requested employee does not exists")
    }
}


//❌❌ dekh ab bs jese he admin emloyee ki profile khole use us employye ne jitte bhi feedback recieve kre h vo deekh jane chahiye 
// useful => https://codepen.io/emreberber/pen/oeREoZ