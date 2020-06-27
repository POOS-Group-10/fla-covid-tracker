const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  login: string,
  password: string,
  email: string
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
