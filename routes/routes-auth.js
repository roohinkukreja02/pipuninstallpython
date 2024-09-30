const express=require("express");
const controller_auth=require("../controllers/controllers_auth");
//const { control_reg } = require("../controllers/controller-auth");
const router=express.Router();
const multer=require("multer");
const {storage}=require("../cloudinary");
const upload=multer({storage});

router.post("/alumni",upload.array("image"),controller_auth.controller_reg_alumni);

router.post("/student",controller_auth.controller_reg_student);

router.post("/login", controller_auth.control_log)

router.post("/verifyOTP", controller_auth.verify_otp);

router.get("/userP", (req,res)=>{
    res.render("userP");
})

router.get("/alumni", (req,res)=>{
    res.render("alumni");
})

router.get("/student", (req,res)=>{
    res.render("student");
})

module.exports=router;