const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Add Order Item
router.post("/add", orderController.addOrder);

// Retrieve Order Item according to Seller Id
router.get("/get/:sellerId", orderController.showOrdersBySeller);


module.exports = router;