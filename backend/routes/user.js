const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../controllers/authenticationController');

const router = express.Router();

//Register a user
router.route('/register').post(registerUser);

// Login a user
router.route('/login').post(loginUser);

module.exports = router;
