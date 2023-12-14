const Order = require("../models/orderSchema");

// Add Order
const addOrder = async (req, res) => {
  try {
    let data = Order(req.body);
    let result = await data.save({ writeConcern: { w: "majority" } });
    console.log(result);
    res
      .status(200)
      .send({ message: `Order for ${data.name} successfully received` });
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

// Retrieve Order by Seller ID
const showOrdersBySeller = async (req, res) => {
  try {
    let data = await Order.find({ sellerId: req.params.sellerId });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = {
  addOrder,
  showOrdersBySeller,
};
