const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  body: String,
  user: String,
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
