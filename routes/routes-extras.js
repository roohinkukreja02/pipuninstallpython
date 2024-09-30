const express=require("express");

const controller_extras=require("../controllers/controller_extras");
//const { control_reg } = require("../controllers/controller-auth");
const router=express.Router();

router.get("/search",controller_extras.search_alumni);
router.get("/sort",controller_extras.sort_alumni);



module.exports=router;