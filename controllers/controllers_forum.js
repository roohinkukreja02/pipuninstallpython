const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')
const Forum = require('../models/models_forums')
const Comment = require('../models/models_comments')

module.exports.renderForum = async(req,res)=>{
    const posts = await Forum.find({})
    res.render('forum', {posts})
}

module.exports.newForum = async(req,res)=>{
    res.render('newForum')
}

module.exports.addForum = async(req,res)=>{
    const post = new Forum(req.body.forum);
    await post.save()
    res.redirect('forum')
}

module.exports.showForum = async(req,res)=>{
    const {id} = req.params;
    const post = await Forum.findById(id)
    res.render('forum', {post})
}



