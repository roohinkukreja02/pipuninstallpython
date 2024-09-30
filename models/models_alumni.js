const mongoose=require("mongoose");
const opts = { toJSON: {virtuals: true}};


const Schema=mongoose.Schema;
//const alumni_schema= new mongoose.Schema({

//const Schema = mongoose.Schema;

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




          //required: true,

phone: {
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

images: imageSchema,
geometry: {
            type: {
                type: String,
                enum: ['Point'],
                //required: true
            },
            coordinates: {
                type: [Number],
                //required: true
            }
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

password:{
    
    //required: true,
   
    type: String,

},
role: {
    type: String,
    default: 'alumni'
},

students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
requestStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
}],







}, opts);

schema_register.virtual('properties.popUp').get(function(){
    return `<h3>
                <b>
                ${this.first_name} ${this.last_name}
                </b>    
            </h3>
            <hr>
            <p>
                ${this.city}...
            </p>`
})


module.exports = mongoose.model('Alumni', schema_register);
