const express = require('express');
const router = express.Router({mergeParams: true});
const student = require('../controllers/controllers_student')

const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(student.dashboard)

router.route('/requests')
    .get(student.findMentors)

router.route('/requests')
    .post(student.RequestMentor)

router.route('/event')
    .get(student.listEvent)
    
router.route('/event/:eventId')
    .delete(student.removeEvent)

router.route('/job')
    .get(student.jobList)

router.route('/job/:jobId')
    .post(student.applyJob)

router.route('/edit')
    .get(student.renderEdit)
    .put(student.edit)


module.exports = router;