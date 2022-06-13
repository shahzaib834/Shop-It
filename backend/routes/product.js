const express = require('express');
const { getProducts, test } = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getProducts);

router.route('/test').post(test);

module.exports = router;
