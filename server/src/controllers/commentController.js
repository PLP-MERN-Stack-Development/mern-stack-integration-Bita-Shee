const Comments = require('../models/Comments');
const Post = require('../models/Post');

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const postExists = await Post.findById(postId);
    if (!postExists) return res.status(404).json({ error: "Post not found" });

    const comment = new Comments({ text, post: postId, author: req.user._id });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comments.find({ post: postId }).populate('author', 'email').sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await Comments.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    
    if (comment.post.toString() !== postId) {
      return res.status(400).json({ error: "Comment does not belong to this post" });
    }
    
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  deleteComment
};