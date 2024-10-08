const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: String,
    description: String,
    peopleNeeded: Number,
    stipend: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Alumni'
    },
    candidates: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports = new mongoose.model('Job', jobSchema)