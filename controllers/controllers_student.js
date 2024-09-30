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
    res.render(`studentdashboard/${id}/edit`, {student})
}

module.exports.edit = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findByIdAndUpdate(id,{...req.body});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    student.image.push(...imgs);
    await student.save();

    if(req.body.deleteImages)
        {
            for(let f of req.body.deleteImages)
            {
                await cloudinary.uploader.destroy(f);
            }
            await student.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages}}}})
            console.log(student)
        }
    res.render(`studentdashboard/${id}/edit`, {student})
}

module.exports.dashboard = async(req,res)=>{
    const {id} = req.params;
    const student = await Student.findById(id).populate('mentors').populate('currentJob');
    console.log(student)
    res.render('student_dash', {student})
}

module.exports.jobList = async(req,res)=>{
    
}

module.exports.findMentors = async(req,res)=>{
    //search
    const {id} = req.params;
    const student = await Student.findById(id);
    if(!student)
    {
        return res.send('student not found')
    }
    const alumni = await Alumni.find({})
    res.redirect(`studentdashboard/${id}`, {student, alumni})
}

module.exports.RequestMentor = async(req,res)=>{
    const {id,alumniId} = req.params;
    const alumni = await Alumni.findById(alumniId);
    const student = await Student.findById(id);
    alumni.requestStudents.push(student._id)
    await alumni.save();
    res.redirect(`studentdashboard/${id}`)
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

