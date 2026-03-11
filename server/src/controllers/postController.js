const Post = require('../models/Post');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const createPost = async (req, res) => {
    try {
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) return res.status(400).json({ error: 'Invalid category' });

        if (!req.file) return res.status(400).json({ error: 'Image file is required' });

        const result = await cloudinary.uploader.upload(req.file.path);

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            image: { url: result.secure_url, public_id: result.public_id },
            author: req.user._id,
            category: req.body.category
        });

        await newPost.save();

        fs.unlinkSync(req.file.path);    

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const category = req.query.category;
        const skip = (page - 1) * limit;

        const query = {};
        
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        const posts = await Post.find(query)
        .populate('category', 'name')
        .populate('author', 'email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

        const total = await Post.countDocuments(query);

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            results: posts
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('category', 'name').populate('author', 'email');
    
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.file) {
      const publicId = post.image.public_id;
      await cloudinary.uploader.destroy(publicId);

      const result = await cloudinary.uploader.upload(req.file.path);
      post.image = { url: result.secure_url, public_id: result.public_id };

      fs.unlinkSync(req.file.path);
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const publicId = post.image.public_id;
    await cloudinary.uploader.destroy(publicId);

    await Post.findByIdAndDelete(postId);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
};