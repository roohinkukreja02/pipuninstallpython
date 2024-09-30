const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    title: String,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = new mongoose.model('Forum', forumSchema)