const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

// Add Product
router.post("/addProduct", productController.addProduct);

// Get Product Data By Category
router.get("/getProductDataByCategory/:category", productController.getProductDataByCategory);

// Get Seller Dashboard Data
router.get("/getProductData/:sellerId", productController.getProductDataBySellerId);

// Get Product Data By Id
router.get("/getProductDataById/:key", productController.getProductDataById);

// Get Product Stocks By Id
router.get("/getProductStocksById/:productId", productController.getProductStocksById);

// Delete Product
router.delete("/delete/:productId", productController.deleteProduct);

// Update Product
router.put("/update/:productId", productController.updateProduct);


// Update Product
// app.put("/api/farmerdashboard/getProductData/update/:productId", async (req, res) => {
//     try {
//         let data = await Product.updateOne(
//             // {condition in object}, {$set:}
//             req.params,
//             {
//                 $set: req.body,
//             },
//             { writeConcern: { w: 'majority' } } // Explicitly set write concern to 'majority'
//         );
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send("Something went wrong!");
//     }
// });

module.exports = router;