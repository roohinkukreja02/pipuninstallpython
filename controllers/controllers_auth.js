const models_student=require("../models/models_student");





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
        phone: body.phno,
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

module.exports={controller_reg_student};