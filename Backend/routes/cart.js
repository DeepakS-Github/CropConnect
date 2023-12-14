const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add Cart Item
router.post("/add", cartController.addCartItem);

// Get Cart Item
router.get("/:userId", cartController.showCartItem);

// Delete Cart Item
router.delete("/delete/:userId/:productId", cartController.deleteCartItem);

// Increase Product Quantity in Cart
router.post("/increase/:userId/:productId", cartController.increaseQty);

// Decreae Product Quantity in Cart
router.post("/decrease/:userId/:productId", cartController.decreaseQty);


module.exports = router;