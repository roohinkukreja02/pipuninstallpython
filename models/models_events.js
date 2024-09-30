const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    description: String,
    date: {
        day: Number,
        month: Number,
        year: Number
    },
    image: [{
        type: String
    }],
    sign: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Alumni'
    }
})

module.exports = mongoose.model("Event", eventSchema);
