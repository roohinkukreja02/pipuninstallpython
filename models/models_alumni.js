const mongoose=require("mongoose");

const schema_register= new mongoose.Schema({

first_name: {
            required: true,
           
            type: String,
          },

last_name: {
            required: true,
            type: String,
          },

grad_year: {
            required: true,
            type: Number,
          },

department: {
            required: true,
            type: String,
          },


email: {
            required: true,
            type: String,
            unique: true,
          },


phno: {
          required: true,
       
          type: Number,
          },

photo: {
            required: true,
           
            type: String,
          },

city: {
            required: true,
           
            type: String,
          },







});

const alumni_model= mongoose.model("Alumni", schema_register);

module.exports={alumni_model};