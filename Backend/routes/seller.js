const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const verifyOTP = require("../middlewares/verifyOTP");

// SignUp
router.post("/signup", verifyOTP, sellerController.signup);

// Login
router.post("/login", sellerController.login);

// Delete Seller Account
router.delete("/deleteSeller/:sellerId", sellerController.deleteSellerAccount);

module.exports = router;
