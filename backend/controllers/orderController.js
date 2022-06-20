const Order = require('../models/order');
const Product = require('../models/product');

const createOrder = async (req, res) => {
  try {
    const { shippingInfo, orderItems } = req.body;
    const user = req.user.id;

    if (!shippingInfo || !orderItems) {
      res.status(400).json({
        success: false,
        message: 'Please provide all fields',
      });

      return;
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: 'Order not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
      res.status(400).json({
        success: false,
        message: 'No Orders yet',
      });
      return;
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const updateProcessOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: 'Order not found',
      });
      return;
    }

    // Checking order status if its already delivered or not
    if (order.orderStatus !== 'Processing') {
      res.status(400).json({
        success: false,
        message: 'Already Delivered',
      });

      return;
    }

    // Changing stock of product.
    order.orderItems.forEach(async (item) => {
      const product = await Product.findById(item.product);

      product.stock -= product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    });

    // Changing status and saving
    order.orderStatus = 'Delivered';
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: 'Wrong Id',
      });

      return;
    }

    await order.remove();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateProcessOrder,
  deleteOrder,
};
