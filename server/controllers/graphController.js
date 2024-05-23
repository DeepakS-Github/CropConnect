const category = require("../constants/productCategory");
const Order = require("../models/orderSchema");
const orderServices = require("../services/orderServices");

const getGraphData = async (req, res) => {
  try {
    let orders = await Order.find({ sellerId: req.sellerId }).select("-sellerId -orderLocation -userId").populate({
      path: "productId",
      select: "category pricePerUnit",
    }).lean();
    const dateVsSales = orderServices.getDateVsSales(orders);
    const categoryVsSales = orderServices.getCategoriesVsSales(orders);
    res
      .status(200)
      .send({ dateVsSales: dateVsSales, categoryVsSales: categoryVsSales });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = { getGraphData };
