const Product = require('../models/productSchema');
const Review = require('../models/reviewSchema');
const Cart = require("../models/cartSchema");

// Add Product
const addProduct = async (req, res) => {
    try {
        let data = Product(req.body);
        console.log("----------------");
        console.log(data);
        let result = await data.save({ writeConcern: { w: 'majority' } });
        console.log(result);
        res.status(200).send({message:"Product Added Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong!"});
    }
}

// Get Product Data By Category
const getProductDataByCategory = async (req, res) => {
    try {
        let data = await Product.find({ category: req.params.category });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: "Something went wrong!"});
    }
}

// Get Product Data By Id
const getProductDataById = async (req, res) => {
    try {
        let data = await Product.findOne({ _id: req.params.key });
        res.status(200).send(data);
        console.log(data);
    } catch (error) {
        res.status(500).send("Something went wrong!");
        console.log(error);
    }
}

// Delete Product Data By Id
const deleteProduct = async (req, res) => {
    try {
        // Find and delete product data from other collections
        await Promise.all([
            Cart.deleteMany({ productId: req.params.productId }),
            Review.deleteMany({ productId: req.params.productId  }),
        ]);

        let data = await Product.deleteOne({ _id: req.params.productId }, { writeConcern: { w: 'majority' } });
        console.log(data);
        res.status(200).send({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Something went wrong!"});
    }
}



// Get Seller Dashboard Data
const getProductDataBySellerId = async (req, res) => {
    try {
        let data = await Product.find({ sellerId: req.params.sellerId });
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message:"Something went wrong!"});
    }
}


module.exports = {
    addProduct,
    getProductDataByCategory,
    getProductDataById,
    getProductDataBySellerId,
    deleteProduct
};