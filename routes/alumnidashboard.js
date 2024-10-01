const express = require('express');
const router = express.Router({mergeParams: true});
const alumni = require('../controllers/controllers_alumni.js')

const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.route('/')
    .get(alumni.dashboard)

router.route('/requests')
    .get(alumni.requestPage)
    .post(alumni.studentRequests)

router.route('/event')
    .get(alumni.eventPage)
    .post(alumni.addEvent)
    .delete(alumni.removeEvent)

router.route('/job')
    .get(alumni.jobPage)
    .post(alumni.addJob)
    .delete(alumni.removeJob)

router.route('/edit')
    .get(alumni.renderEdit)
    .put(alumni.edit)

router.route('/help')
    .get(alumni.help)


module.exports = router;