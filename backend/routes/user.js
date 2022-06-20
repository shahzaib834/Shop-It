const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/authenticationController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

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

//Update Profile
router.route('/update/profile').put(protect, updateProfile);

// Get All Users -- ADMIN ROUTE
router.route('/allUsers').get(protect, authorizeRoles('admin'), getAllUsers);

// ADMIN ROUTE
// Get Specific User....Update User....Delete User
router
  .route('/:id')
  .get(protect, authorizeRoles('admin'), getUser)
  .put(protect, authorizeRoles('admin'), updateUser)
  .delete(protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
