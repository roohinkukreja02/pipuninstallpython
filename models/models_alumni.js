const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: String,
    filename: String
})

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


phone: {
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

images: imageSchema,
geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
    },


          
linkedin:{
            required: true,
           
            type: String,
},

interests:{
    required: true,
   
    type: String,
},

company:{
    required: true,
   
    type: String,
},

domain: {
    required: true,
   
    type: String,
},


achievements: {
    required: true,
   
    type: String,
},


resume:{
    
        required: true,
       
        type: String,

},

students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
requestStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
}],







});

module.exports = mongoose.model("Alumni", schema_register);