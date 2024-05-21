const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

// Add FAQ
router.post("/:productId", verifyAccessToken, faqController.addFAQ);

// Show Paginated FAQ by Product
router.get("/product/:productId", faqController.showFAQsbyProduct);

// Show FAQ by Seller
router.get("/showbyseller", verifyAccessToken, faqController.showFAQsbySeller);

// Answering the FAQ
router.patch("/:faqId", faqController.ansFAQ);

module.exports = router;