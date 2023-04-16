const express = require("express");
require("../connectDB");
const Cart = require("./cartSchema");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

// Add Cart Item
app.post("/api/addCartItem/:key1/:key2", async (req, res) => {
  try {
    let data = await Cart.findOne({userId: req.params.key1});
    if(!data){
      data = await Cart({userId: req.params.key1});
    }
    data.itemsId.push(req.params.key2)
    let result = await data.save({ writeConcern: { w: 'majority' } } );
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(400);
  }
});


// Show Cart Item
app.get("/api/showCartItem/:key", async (req, res) => {
  try {
    let data = await Cart.findOne({ userId: req.params.key });
    res.status(200).send(data);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});


// Delete Cart Item
app.delete("/api/deleteCartItem/:key1/:key2", async (req, res) => {
  try {
    const key = req.params.key2;
    const item = await Cart.findOne({ userId: req.params.key1 });
    if (!item) {
      return res.status(200).send({ message: "Item not found!" });
    }
    const updatedItems = item.itemsId.filter((id) => id !== key);
    item.itemsId = updatedItems;
    await item.save({ writeConcern: { w: 'majority' } } );
    res.status(201).send({ message: "Item deleted successfully!" });
  } catch (error) {
    res.status(400);
  }
});

  
  


app.listen(4100);
