const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyOTP = require("../middlewares/verifyOTP");


// SignUp
// router.post("/signup", verifyOTP, userController.signup);
router.post("/signup", userController.signup);


// Login
router.post("/login", userController.login);


// Delete User Account
router.delete("/deleteUser/:userId", userController.deleteUserAccount);


module.exports = router;