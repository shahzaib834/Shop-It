const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

// Get All Products And product with keywords.
// For the time being we are only filtering by name.
const getProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const products = await Product.find({ ...keyword });

    console.log(keyword);

    res.status(201).json({
      success: 'pass',
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(400).json({
      success: 'fail',
      message: err.message,
    });
  }
});

// Add new Product
// @METHOD POST
const addProduct = async (req, res) => {
  try {
    const product = req.body;

    await Product.create(product);

    res.status(201).json({
      success: 'True',
      message: 'Created Succesfully',
      product,
    });
  } catch (err) {
    res.status(400).status({
      success: 'False',
      message: err.message,
    });
  }
};

//Get Product by ID
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: 'fail',
      message: 'Product not found. Check your id',
    });
  }

  res.status(200).json({
    success: 'pass',
    message: 'Product found',
    product,
  });
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
      succes: 'pass',
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: 'fail',
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: 'fail',
        message: 'Product not found. Check your id',
      });
    }
    await product.remove();

    res.status(200).json({
      success: 'true',
      message: 'Product is deleted',
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: 'false',
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
};
