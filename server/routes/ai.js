const express = require('express');
const router = express.Router();
const aiController = require('./../controllers/aiController')

// Predict Crops
router.post("/crops", aiController.predictCrops);


module.exports = router;