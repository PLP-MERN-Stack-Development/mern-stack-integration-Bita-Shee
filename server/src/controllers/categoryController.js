const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });

        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ error: "Category already exists" });

        const category = await Category.create({ name });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('posts');
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Category not found" });
        await category.deleteOne();
        res.status(200).json({ message: "Category and associated posts deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory
};