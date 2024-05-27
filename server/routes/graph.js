const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


// Get Graph Data
router.get("/", verifyAccessToken, graphController.getGraphData);


module.exports = router;