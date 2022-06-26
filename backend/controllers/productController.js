const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { filter } = require('../utils/filter');

// Get All Products And product with keywords.
// For the time being we are only filtering by name.
const getProducts = asyncHandler(async (req, res) => {
  try {
    const resPerPage = 4;
    const allProducts = await Product.find();
    // Filter is the method which filters the query and return filtered results.
    const products = await filter(Product.find(), req.query);

    res.status(201).json({
      success: true,
      count: allProducts.length,
      resPerPage,
      products,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Add new Product
// @METHOD POST
const addProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const product = req.body;

    await Product.create(product);

    res.status(201).json({
      success: true,
      message: 'Created Succesfully',
      product,
    });
  } catch (err) {
    res.status(400).status({
      success: false,
      message: err.message,
    });
  }
};

//Get Product by ID
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: 'Product not found. Check your id',
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Product found',
      product,
    });
  }
});

//Update Product By ID
//@METHOD POST
const updateProductByID = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      succes: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found. Check your id',
      });

      return;
    }
    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product is deleted',
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Review A product
const reviewProduct = async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // Finding product to review
  const product = await Product.findById(productId);

  // Pushing review to the product.
  product.reviews.push(review);
  product.numOfReviews += 1;

  // TODO - Caluting ratings of all product reviews
  //
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product,
  });
};

// Get all reviews of product
const getAllReviews = async (req, res) => {
  const product = await Product.findById(req.params.id).select('reviews');

  res.status(200).json({
    success: true,
    count: product.reviews.length,
    product,
  });
};

const deleteAReview = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.productId,
      {
        $pull: { reviews: { _id: req.params.id } },
      },
      { new: true, runValidators: true }
    );

    // TODO - adjust product ratings after removing a review
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductByID,
  updateProductByID,
  deleteProduct,
  addProduct,
  reviewProduct,
  getAllReviews,
  deleteAReview,
};
