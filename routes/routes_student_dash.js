const express = require('express');
const router = express.Router({mergeParams: true});
const forum = require('../controllers/controllers_forum')

router.get('/student_dash', (req,res)=>{
res.render("student_dash");
});

router.get('/student_dash_set', (req,res)=>{
res.render("student_dash_set");
});

router.get('/student_dash_', (req,res)=>{
    res.render("student_dash_set");
});
       



module.exports = router;
