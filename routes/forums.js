const express = require('express');
const router = express.Router({mergeParams: true});
const forum = require('../controllers/controllers_forum')

router.route('/forum')
    .get(forum.renderForum)
    .post(forum.addForum)

router.route('/forum/new')
    .get(forum.newForum)

router.route('/forum/:id')
    .get(forum.showForum)
    .delete(forum.deleteForum)