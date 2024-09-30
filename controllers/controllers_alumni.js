const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')
const Event = require('../models/models_events')
const Job = require('../models/models_jobs')
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


const mongoose = require("mongoose");

module.exports.renderEdit = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    res.render(`dashboard/${id}/edit`, {alumni})
}

module.exports.edit = async(req,res)=>{
    const geoData = await maptilerClient.geocoding.forward(req.body.city, { limit: 1 });
    const {id} = req.params;
    const alumni = await Alumni.findByIdAndUpdate(id,{...req.body});
    alumni.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    alumni.image.push(...imgs);
    await alumni.save();

    if(req.body.deleteImages)
        {
            for(let f of req.body.deleteImages)
            {
                await cloudinary.uploader.destroy(f);
            }
            await alumni.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages}}}})
            console.log(alumni)
        }
    res.render(`dashboard/${id}/edit`, {alumni})
}

module.exports.dashboard = async(req,res)=>{
    const {id} = req.params;
    //const alumni = await Alumni.findById(id).populate('students');
    console.log(req.session.user1);
    //res.render(`dashboard/${id}`, {alumni})
    res.send(req.session.user1)
}

module.exports.requestPage = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id);
    if(!alumni)
    {
        return res.send('alumni not found')
    }
    const students = await Student.find({mentors: alumni._id})
    console.log(students, alumni)
    res.redirect(`dashboard/${id}`, {students, alumni})
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
    res.redirect(`dashboard/${id}`)
}

module.exports.addEvent = async(req,res)=>{
    const {id} = req.params;
    const alumni = await Alumni.findById(id)
    const event = new Event(req.body.event);
    event.author = alumni._id;
    await event.save();
    res.render(`dashboard/${id}`)
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