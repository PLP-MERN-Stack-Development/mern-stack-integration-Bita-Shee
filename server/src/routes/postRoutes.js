const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const protect = require('../middleware/authMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');


router.post('/', protect, upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.put('/:postId', protect, upload.single('image'), updatePost);
router.delete('/:postId', protect, deletePost);
router.get('/:postId/comments', getCommentsByPost);
router.post('/:postId/comments', protect, createComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

module.exports = router;