const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    head: String,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Alumni'
    }
})

module.exports = new mongoose.model('Comment', commentSchema)
