const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory, getCategoryById, deleteCategory } = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllCategories);
router.post('/', protect, createCategory);
router.get('/:id', getCategoryById);
router.delete('/:id', protect, deleteCategory);

module.exports = router;