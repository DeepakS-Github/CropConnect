const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

// Add Review
router.post("/add", verifyAccessToken, reviewController.addReview);

// Get Paginated Review
router.get("/get", reviewController.getPaginatedReview);

// Get Review
router.get("/:productid", reviewController.getReview);

// Get Review Using Ref
// router.get("/ref/:productId", reviewController.getReviewUsingRef);

module.exports = router;