const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const BlogPost = mongoose.model('Users', BlogPostSchema);

module.exports = BlogPost;
