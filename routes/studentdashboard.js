const express = require('express');
const router = express.Router({mergeParams: true});
const student = require('../controllers/controllers_student')

const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

// router.route('/')
//     .get(alumni.dashboard)

// router.route('/requests')
//     .get(alumni.requestPage)
//     .post(alumni.studentRequests)

// router.route('/event')
//     .get(alumni.addEvent)
//     .delete(alumni.removeEvent)

// router.route('/job')
//     .get(alumni.addJob)
//     .delete(alumni.removeJob)

// router.route('/edit')
//     .get(alumni.renderEdit)
//     .put(alumni.edit)


// module.exports = router;