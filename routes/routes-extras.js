const express=require("express");
const router = express.Router({mergeParams: true});

const controller_extras=require("../controllers/controller_extras");
//const { control_reg } = require("../controllers/controller-auth");

router.get("/studentdashboard/:id/requests/search",controller_extras.search_alumni);
router.get("/studentdashboard/:id/requests/sort",controller_extras.sort_alumni);



module.exports=router;