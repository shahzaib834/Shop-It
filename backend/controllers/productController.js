const Product = require('../models/product');

const getProducts = (req, res) => {
  res.status(200).json({
    success: 'ok',
    message: 'The route will show all the products',
  });
};

const test = async (req, res) => {
  const product = await Product.create({
    name: 'Keyboard',
  });

  console.log(product);
};

module.exports = { getProducts, test };
