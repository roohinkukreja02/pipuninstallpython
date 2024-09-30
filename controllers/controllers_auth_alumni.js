

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