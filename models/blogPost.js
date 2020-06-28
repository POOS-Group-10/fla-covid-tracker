const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: {
    String,
    require: true 
  },
  body: {
    String,
    require: true
  },
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
