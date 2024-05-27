const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

// Add Review
router.post("/:productId", verifyAccessToken, reviewController.addReview);

// Get Paginated Review
router.get("/:productId", reviewController.getPaginatedReview);

// Get Review Using Ref
// router.get("/ref/:productId", reviewController.getReviewUsingRef);

module.exports = router;