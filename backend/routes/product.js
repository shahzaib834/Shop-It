const express = require('express');
const {
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProduct,
  addProduct,
  reviewProduct,
  getAllReviews,
  deleteAReview,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Get All Products.
router.route('/').get(getProducts);

//Add New Product
// @METHOD POST
router.route('/new').post(protect, authorizeRoles('admin'), addProduct);

//Get, Delete & Delete Product by ID.
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, authorizeRoles('admin'), deleteProduct)
  .put(protect, authorizeRoles('admin'), updateProductByID);

// Add a review to the product
router.route('/review/add').put(protect, reviewProduct);

// Get All reviews of product
router.route('/reviews/:id').get(protect, getAllReviews);

//Delete a review
router.route('/review/delete/:id').put(protect, deleteAReview);

module.exports = router;
