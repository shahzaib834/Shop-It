const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  type: {},
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    maxLength: 32,
  },
  password: {
    type: String,
    required: true,
    maxLength: 32,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
