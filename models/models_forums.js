const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    title: String,
    body: String,
    
})