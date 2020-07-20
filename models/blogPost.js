const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  user: String,
  county: String,
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
