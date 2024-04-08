const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Generate OTP
router.post("/generate", otpController.generateOTP);

module.exports = router;