const models_student=require("../models/models_student");
const models_alumni=require("../models/models_alumni");

const fetch_alums=async (req,res)=>{
    const alumni=await models_alumni.find({});
    res.render("student_dash_alum_connect", ({alumni}));

};

module.exports={fetch_alums};