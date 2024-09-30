const Alumni = require('../models/models_alumni')
const Student = require('../models/models_student')
const Forum = require('../models/models_forums')
const Comment = require('../models/models_comments')

module.exports.addComment = async(req,res)=>{
    const forum = await Forum.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    forum.comments.push(comment);
    await comment.save();
    await forum.save();
    res.redirect(`/forum/${forum._id}`)
}

module.exports.removeComment = async(req,res)=>{
    const {id,commentId} = req.params;
    await Forum.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.redirect(`/forum/${forum._id}`)
}