const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const User = mongoose.model('Users', UserSchema);

module.exports = User;
