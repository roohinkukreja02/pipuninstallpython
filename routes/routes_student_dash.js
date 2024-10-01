const express = require('express');
const router = express.Router({mergeParams: true});
const student = require('../controllers/controllers_rooh_stud');


router.get('/student_dash', (req,res)=>{
res.render("student_dash");
});

router.get('/student_dash_set', (req,res)=>{
res.render("student_dash_set");
});

router.get('/student_dash_set', (req,res)=>{
    res.render("student_dash_set");
});

router.get('/student_dash_alum_connect',student.fetch_alums);


       



module.exports = router;
