const models_student=require("../models/models_student");
const models_alumni=require("../models/models_alumni");




//mailing prerequisite
const nodemailer=require("nodemailer");
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itsmerooh123@gmail.com',
        pass: "shbl fmya nnzt rsup",
    }
});

let current_otp, current_email, current_username;

//otp generator
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 6-digit OTP
};


const sendOTP = (email, otp) => {
    const mailOptions = {
       // from: 'itsmerooh123@gmail.com',  not needed i think
        to: email,                     
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


//working
const controller_reg_student=async (req,res)=>{
    const body=req.body;
    
    if(body.password===body.confirm_password)
    {
   
    try{
    const create=await models_student.create({
        
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        graduationYear: body.grad_year,
        phone: body.phone,
        department: body.department,
        password: body.password,
        
        
        committee: body.committee,
        interests: body.interests,
        techDomain: body.domain,
        achievements: body.achievements,



    });

    if(create){
        
        res.json({msg: "created"});
    }
       
    else{
        console.log(create);
    }
   }
   catch(err){
       console.log(err);
   }
   }
   else{
    console.log("Passwords don't match");
   }

};


//working
const controller_reg_alumni=async (req,res)=>{
    const body=req.body;
    
    if(body.password===body.confirm_password)
    {
   
    try{
    const create=await models_alumni.create({
        
    first_name: body.first_name,

    last_name: body.last_name,

    grad_year: body.grad_year,

    department: body.department,


    email: body.email,


    phno: body.phno,

    photo: body.photo,

    city: body.city,


            
    linkedin: body.linkedin,

    interests: body.interests,

    company: body.company,

    domain: body.domain,


    achievements: body.achievements,


    resume:body.resume,



    });

    if(create){
        
        res.json({msg: "created"});
    }
       
    else{
        console.log(create);
    }
   }
   catch(err){
       console.log(err);
   }
   }
   else{
    console.log("Passwords don't match");
   }

};




const control_log=async (req,res)=>
    {
        console.log("control reached");
        const body=req.body;
        console.log(body.email);
        const search_one=await model1.findOne({email: body.email});
        if(search_one){ //&& search_one.password===body.password){
            try{
    
                if(search_one.password==body.password)
                {
                current_otp=generateOTP();
                current_email=body.email;
                current_name=search_one.first_name;
                
                console.log(body.email);
    
                if(body)
                sendOTP(body.email, current_otp);
                res.send(`<script>alert('This is an alert from the server!');</script>`);
              
                }
                else
                {
                    res.json({msg: "Passwords don't match"});
                }
            }
            catch(err){
                console.log(err);
                res.end({msg: "error"});
            }
        }
        else
        {
    
            res.json({msg: "Email doesn't exist"});
        }
    
    };
    
    const verify_otp=async (req,res)=>{
        const body=req.body;
        const otp=body.otp;
        console.log(otp)
        console.log(current_otp);
        if(otp==current_otp)
        {
            console.log(current_username);
            //req.session.user=body
            req.session.user1={email: current_email, username: current_username };
            console.log(req.session.user1);
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                }
        
            });
            console.log(req.session.user1.email);
            
            res.redirect("/dash-free");
        }
        else
        res.end("incorrect otp");
        
    };
    
    const logout=async (req,res)=>{
    
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Unable to log out');
            }
            res.render("choice");
        });
    }
    
    
    



module.exports={controller_reg_student, controller_reg_alumni, control_log, verify_otp};