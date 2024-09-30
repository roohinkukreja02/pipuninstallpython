const {mode}=require("../models/models_student.js");



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



const control_reg_free=async (req,res)=>{
    const body=req.body;
    const { day, month, year } = req.body;
    if(body.password===body.confirm_password)
    {
    const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    try{
    const create=await model1.create({
        first_name: body.first_name,

        last_name: body.last_name,

        phno: body.phno,
          
        dob: date,

        photo: body.photo,




       street: body.street ,

       apartment: body.apartment,

       city: body.city,

       state: body.state,

       pincode: body.pincode,




       linkedin: body.linkedin,

       otherlinks: body.otherlinks,





       email: body.email,

       username: body.username,

       password: body.password,


       freelancer: { 

            role: true,

            skills: body.skills,

            resume: body.resume,
      },

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
