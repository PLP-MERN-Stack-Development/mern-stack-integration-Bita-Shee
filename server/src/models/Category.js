const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true, required: true },
}, { timestamps: true });

categorySchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "category",
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

categorySchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  await mongoose.model("Post").deleteMany({ category: this._id });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;