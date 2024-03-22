const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const totalPrice = product.price * quantity;
    const order = await Order.create({ product: productId, quantity, totalPrice });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
