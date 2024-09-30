const {model1}=require("../models/model-register");

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



const controller_reg_student=async (req,res)=>{
    const body=req.body;
    
    if(body.password===body.confirm_password)
    {
   
    try{
    const create=await model1.create({
        
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

const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')

const mongoose = require("mongoose");

module.exports.dashboard = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id).populate('students');
    res.render(`dashboard/${id}`)
}

module.exports.requestPage = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    const students = await Student.find({mentors: alumni._id})
    res.redirect(`dashboard/${id}`)
}

module.exports.studentRequests = async(req,res)=>{
    const {id,studentID} = req.params;
    const alumni = await Alumni.findById(id);
    const student = await Student.findById(studentID);
    if(req.body.radio)
    {
        alumni.students.push(student._id)
        students.alumni.push(alumni._id)
    }
    else
    {
        await Alumni.findByIdAndUpdate(id, { $pull: { requestStudents: studentID } }); //remove student
    }
    await alumni.save();
    await student.save();
    res.redirect(`dashboard/${id}`)
}