const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const alumni_schema= new mongoose.Schema({

first_name: {
            required: true,
           
            type: String,
          },

last_name: {
            required: true,
            type: String,
          },

grad_year: {
            //required: true,
            type: Number,
          },

department: {
            //required: true,
            type: String,
          },


email: {
            required: true,
            type: String,
            unique: true,
          },


phno: {
          //required: true,
       
          type: Number,
          },

photo: {
            //required: true,
           
            type: String,
          },

city: {
            //required: true,
           
            type: String,
          },



linkedin:{
            //required: true,
           
            type: String,
},

interests:{
    //required: true,
   
    type: String,
},

company:{
    //required: true,
   
    type: String,
},

domain: {
    //required: true,
   
    type: String,
},


achievements: {
   // required: true,
   
    type: String,
},


resume:{
    
        //required: true,
       
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

module.exports = mongoose.model('Alumni', alumni_schema)