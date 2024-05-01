const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// SignUp
router.post("/:type/signup", authController.signup);

// Login
router.post("/:type/login", authController.login);

// Verify Account
router.patch("/:type/verify/:token", authController.verifyToken);

module.exports = router;
