const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')
const Event = require('../models/models_events')
const Job = require('../models/models_jobs')


const mongoose = require("mongoose");

module.exports.dashboard = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id).populate('mentors');
    res.render(`studentdashboard/${id}`, {student})
}

module.exports.requestPage = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    const students = await Student.find({mentors: alumni._id})
    res.redirect(`studentdashboard/${id}`, {students, alumni})
}

module.exports.studentRequests = async(req,res)=>{
    const {id,studentID} = req.params;
    const alumni = await Alumni.findById(id);
    const student = await Student.findById(studentID);
    if(req.body.radio)
    {
        alumni.students.push(student._id)
        student.mentors.push(alumni._id)
        await alumni.save();
        await student.save();
    }
    else
    {
        await Alumni.findByIdAndUpdate(id, { $pull: { requestStudents: studentID } }); //remove student
    }
    res.redirect(`studentdashboard/${id}`)
}

module.exports.addEvent = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id)
    const event = new Event(req.body.event);
    event.author = alumni._id;
    await event.save();
    res.render(`studentdashboard/${id}`)
}

module.exports.removeEvent = async(req,res)=>{
    const {id, eventId} = req.params;
    await Event.findByIdAndDelete(eventId)
    res.redirect(`dashboard/${id}`)
}

module.exports.addJob = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id)
    const job = new Job(req.body.job);
    job.author = alumni._id;
    await job.save();
    res.render(`dashboard/${id}`)
}

module.exports.removeJob = async(req,res)=>{
    const {id, jobId} = req.params;
    await Job.findByIdAndDelete(jobId)
    res.redirect(`dashboard/${id}`)
}