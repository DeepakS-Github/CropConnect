const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const multer = require("multer");
const upload = multer();

// Add Product
router.post(
  "/",
  verifyAccessToken,
  upload.single("image"),
  productController.addProduct
);

// Get Product Data By Category
router.get("/category/:category", productController.getProductDataByCategory);

// Get Product Dashboard Data By Id
router.get("/dashboard/:productId", productController.getProductDashboardData);

// Get Seller Dashboard Products Data
router.get(
  "/seller",
  verifyAccessToken,
  productController.getProductDataBySellerId
);

// Get Product Data By Id
router.get(
  "/getProductDataById/:productId",
  productController.getProductDataById
);

// Get Product Stocks By Id
router.get(
  "/getProductStocksById/:productId",
  productController.getProductStocksById
);

// Delete Product
router.delete(
  "/:productId",
  verifyAccessToken,
  productController.deleteProduct
);

// Update Product
router.put(
  "/:productId",
  verifyAccessToken,
  upload.single("image"),
  productController.updateProduct
);

// Get main product data by id 
router.get("/mainProductData/:productId", productController.getMainProductDataById);


module.exports = router;
