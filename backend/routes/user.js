const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  getMyProfile,
  changePassword,
} = require('../controllers/authenticationController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//Register a user
router.route('/register').post(registerUser);

// Login a user
router.route('/login').post(loginUser);

// Logout user
router.route('/logout').get(logout);

// Get my Profile
router.route('/me').get(protect, getMyProfile);

// Update Password
router.route('/password/update').put(protect, changePassword);

module.exports = router;
