const express = require('express');
const {
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProduct,
  addProduct,
} = require('../controllers/productController');

const router = express.Router();

// Get All Products.
router.route('/').get(getProducts);

//Add New Product
// @METHOD POST
router.route('/new').post(addProduct);

//Get, Delete & Delete Product by ID.
router
  .route('/:id')
  .get(getProductByID)
  .delete(deleteProduct)
  .put(updateProductByID);

module.exports = router;
