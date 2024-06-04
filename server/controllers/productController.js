const Product = require("../models/productSchema");
const Review = require("../models/reviewSchema");
const { uploadImageToCloudinary } = require("../services/cloudinaryServices");

// Add Product
const addProduct = async (req, res) => {
  try {
    req.body.sellerId = req.sellerId;

    const uploadedImage = req.file;

    console.log(uploadedImage);

    if (!uploadedImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    try {
      let cloudRes = await uploadImageToCloudinary(uploadedImage.buffer);
      req.body.image = cloudRes.secure_url;
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:
          "There was a problem communicating with Cloudinary during the image upload.",
      });
    }

    let product = Product(req.body);
    await product.save();

    res.status(200).send({ message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Data By Category
const getProductDataByCategory = async (req, res) => {
  try {
    let page = req.query.page;
    let products_per_page = req.query.products_per_page;

    let skip = (page - 1) * products_per_page;

    const totalProduct = await Product.countDocuments({
      category: req.params.category,
    });

    const hasMore = totalProduct > page * products_per_page ? true : false;

    let data = await Product.find({ category: req.params.category })
      .sort({ date: -1 })
      .skip(skip)
      .limit(products_per_page)
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location sellerId"
      )
      .lean();
    res.status(200).send({ products: data, hasMore });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Dashboard Data
const getProductDashboardData = async (req, res) => {
  try {
    let data = await Product.findById(req.params.productId)
      .select("shelfLife quantity description")
      .lean();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Product Stocks By Id
const getProductStocksById = async (req, res) => {
  try {
    let productQty = await Product.findById(req.params.productId)
      .select("quantity")
      .lean();

    if (!productQty) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ quantityLeft: productQty.quantity });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Get Product Data By Id
const getProductDataById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId).lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
    // console.log(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Delete Product Data By Id
const deleteProduct = async (req, res) => {
  try {
    const sellerId = req.sellerId;

    let product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.sellerId != sellerId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.productId);
    // console.log(data);
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Seller Dashboard Data
const getProductDataBySellerId = async (req, res) => {
  try {
    let data = await Product.find({ sellerId: req.sellerId }).lean();
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const sellerId = req.sellerId;
    console.log(sellerId);

    const uploadedImage = req.file;

    console.log(uploadedImage);

    if (uploadedImage) {
      try {
        let cloudRes = await uploadImageToCloudinary(uploadedImage.buffer);
        req.body.image = cloudRes.secure_url;
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message:
            "There was a problem communicating with Cloudinary during the image upload.",
        });
      }
    }

    let product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.sellerId != sellerId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this product" });
    }
    const updatedFields = {};

    const {
      image,
      name,
      category,
      description,
      pricePerUnit,
      measuringUnit,
      minimumOrderQuantity,
      location,
      quantity,
      shelfLife,
    } = req.body;

    if (image && image !== product.image) {
      updatedFields.image = image;
    }
    if (name && name !== product.name) {
      updatedFields.name = name;
    }
    if (category && category !== product.category) {
      updatedFields.category = category;
    }
    if (description && description !== product.description) {
      updatedFields.description = description;
    }
    if (pricePerUnit && pricePerUnit !== product.pricePerUnit) {
      updatedFields.pricePerUnit = pricePerUnit;
    }
    if (measuringUnit && measuringUnit !== product.measuringUnit) {
      updatedFields.measuringUnit = measuringUnit;
    }
    if (
      minimumOrderQuantity &&
      minimumOrderQuantity !== product.minimumOrderQuantity
    ) {
      updatedFields.minimumOrderQuantity = minimumOrderQuantity;
    }
    if (
      location &&
      location.latitude &&
      location.longitude &&
      location.latitude !== product.location.latitude
    ) {
      updatedFields["location.latitude"] = location.latitude;
    }
    if (
      location &&
      location.latitude &&
      location.longitude &&
      location.longitude !== product.location.longitude
    ) {
      updatedFields["location.longitude"] = location.longitude;
    }
    if (quantity && quantity !== product.quantity) {
      updatedFields.quantity = quantity;
    }
    if (shelfLife && shelfLife !== product.shelfLife) {
      updatedFields.shelfLife = shelfLife;
    }

    console.log("Updated Fields: ", updatedFields);

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }

    await Product.findByIdAndUpdate(req.params.productId, updatedFields);

    res.status(200).send({
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

const getMainProductDataById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.productId)
      .select(
        "name image brand measuringUnit pricePerUnit minimumOrderQuantity location sellerId"
      )
      .lean();

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
    // console.log(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = {
  addProduct,
  getProductDataByCategory,
  getProductDataById,
  getProductDataBySellerId,
  deleteProduct,
  updateProduct,
  getProductStocksById,
  getProductDashboardData,
  getMainProductDataById,
};
