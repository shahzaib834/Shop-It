const Product = require('../models/product');

// Get All Produtcts.
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

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
};

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
const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: 'fail',
        message: 'Product not found. Check your id',
      });

      res.status(200).json({
        success: 'pass',
        message: 'Product found',
        product,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: 'fail',
      message: err.message,
    });
  }
};

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

      await product.remove();

      res.status(200).json({
        success: 'true',
        message: 'Product is deleted',
        product,
      });
    }
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
