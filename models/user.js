const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userCounty: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
    required: true 
  },
  date: {
    type: String,
    default: Date.now()
  }
});

// Model
const User = mongoose.model('user', UserSchema);

module.exports = User;
