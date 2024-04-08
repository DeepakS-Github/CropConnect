const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController')


// Get Graph Data
router.get("/visualize/:sellerId", graphController.getGraphData);


module.exports = router;