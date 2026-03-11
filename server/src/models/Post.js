const { required } = require('joi');
const mongoose = require('mongoose');
const { url } = require('../config/cloudinary');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { url: { type: String, required: true }, public_id: { type: String, required: true } },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;