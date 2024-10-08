const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')
const Event = require('../models/models_events')
const Job = require('../models/models_jobs')
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


const mongoose = require("mongoose");

module.exports.renderEdit = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id);
    res.render(`student_dash_set`, {student})
}

module.exports.edit = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findByIdAndUpdate(id,req.body);
    await student.save();
    res.redirect(`/studentdashboard/${id}`)
}

module.exports.dashboard = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id).populate('mentors').populate('currentJob');
    res.render('student_dash', {student})
}

module.exports.jobList = async(req,res)=>{
    const{id} = req.params;
    const student = await Student.findById(id)
    const jobs = await Job.find({})
    res.render('student_dash_jobs', {jobs,student})
}

module.exports.findMentors = async(req,res)=>{
    //search
    const {id} = req.params;
    const student = await Student.findById(id);
    const alumni = await Alumni.find({})
    res.render("student_dash_alum_connect", {student, alumni});
}

module.exports.RequestMentor = async(req,res)=>{
    const {id,alumniId} = req.params;
    const alumni = await Alumni.findById(alumniId);
    const student = await Student.findById(id);
    alumni.requestStudents.push(student._id)
    await alumni.save();
    res.redirect(`/studentdashboard/${id}/requests`)
}
// done
module.exports.addEvent = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id)
    const event = new Event(req.body.event);
    event.author = student._id;
    await event.save();
    res.redirect(`studentdashboard/${id}`)
}

module.exports.listEvent = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id)
    const event = await Event.find({})
    res.render(`student_dash`, {student})
}
// done
module.exports.removeEvent = async(req,res)=>{
    const {id, eventId} = req.params;
    await Event.findByIdAndDelete(eventId)
    res.redirect(`studentdashboard/${id}`)
}

module.exports.applyJob = async(req,res)=>{
    const {id, jobId} = req.params;
    const student = await Student.findById(id)
    const job = await Job.findById(jobId)
    if(req.body.radio)
    {
        job.candidates.push(student._id)
        student.currentJob = job._id;
    }
    await job.save();
    await student.save();
    res.redirect(`studentdashboard/${id}`)
}

