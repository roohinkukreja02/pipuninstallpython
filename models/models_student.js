const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    username: String,
    graduationYear: Number,
    phone: Number,
    department: String,
    password: String,
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumni'
    }],
    url: [{
        type: String
    }],
    committee: String,
    interests: String,
    techDomain: String,
    achievements: String,
    images: imageSchema,
    accepted: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Student', studentSchema)
