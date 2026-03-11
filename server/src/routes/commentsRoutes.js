const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');

router.post('/:postId', protect, createComment);
router.get('/:postId', getCommentsByPost);
router.delete('/:postId/:commentId', protect, deleteComment);

module.exports = router;