const express = require('express');
const {
  createOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateProcessOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Create An Order
router.route('/new').post(protect, createOrder);

// Get order by id
router.route('/:id').get(protect, authorizeRoles('admin'), getSingleOrder);

// Get logged in user orders
router.route('/me/orders').get(protect, getMyOrder);

router
  .route('/admin/orders')
  .get(protect, authorizeRoles('admin'), getAllOrders);

// Update Process order
router
  .route('/update/:id')
  .put(protect, authorizeRoles('admin'), updateProcessOrder);

router
  .route('/delete/:id')
  .delete(protect, authorizeRoles('admin'), deleteOrder);

module.exports = router;
