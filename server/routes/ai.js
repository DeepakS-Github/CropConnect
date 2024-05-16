const express = require('express');
const router = express.Router();
const aiController = require('./../controllers/aiController')

// Predict Crops
router.get("/crops", aiController.predictCrops);


module.exports = router;