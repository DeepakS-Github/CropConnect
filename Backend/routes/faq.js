const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Add FAQ
router.post("/add", faqController.addFAQ);

// Show Paginated FAQ by Product
router.get("/showbyproduct", faqController.showFAQsbyProduct);

// Show Paginated FAQ by Seller
router.get("/showbyseller", faqController.showFAQsbySeller);

module.exports = router;