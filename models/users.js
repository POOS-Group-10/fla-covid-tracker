const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const User = mongoose.model('Users', UserSchema);

module.exports = User;
