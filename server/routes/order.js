const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

// Add Order Item
router.post("/", verifyAccessToken, orderController.addOrder);

// Retrieve Order Item according to Seller Id
router.get("/", verifyAccessToken, orderController.showOrdersBySeller);


module.exports = router;