// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_no: {
    type: String,
    required: false,
    default:null
  },
  profile_pic: {
    type: String,
    required: false,
    default:null
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
