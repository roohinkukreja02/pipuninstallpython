const express=require("express");
const controller_auth=require("../controllers/controllers_auth");
//const { control_reg } = require("../controllers/controller-auth");
const router=express.Router();

router.post("/alumni",controller_auth.controller_reg_alumni);

router.post("/student",controller_auth.controller_reg_student);

router.post("/login", controller_auth.control_log)

router.post("/verifyOTP", controller_auth.verify_otp);

module.exports=router;