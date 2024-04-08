const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Add Review
router.post("/add", reviewController.addReview);

// Get Paginated Review
router.get("/get", reviewController.getPaginatedReview);

// Get Review
router.get("/:productid", reviewController.getReview);

module.exports = router;