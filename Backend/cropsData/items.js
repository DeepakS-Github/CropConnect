const express = require("express");
require("../connectDB");
const Item = require("./itemSchema");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

// Add Item
app.post("/api/addItem", async (req, res) => {
  try {
    let data = Item(req.body);
    let result = await data.save({ writeConcern: { w: 'majority' } });
    console.log(result);
    res.status(400).send(result);
  } catch (error) {
    res.status(500);
  }
});

// Get Item Data By Category
app.get("/api/getItemData/:key", async (req, res) => {
  try {
    let data = await Item.find({ category: req.params.key });
    res.status(400).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

// Get Item Data By Id
app.get("/api/getIdItemData/:key", async (req, res) => {
  try {
    let data = await Item.findOne({ _id: req.params.key });
    res.status(200).send(data);
    console.log(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
});

// Get Farmer Dashboard Data
app.get("/api/farmerdashboard/getItemData/:key", async (req, res) => {
  try {
    let data = await Item.find({ farmerId: req.params.key });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

// Delete Item
app.delete("/api/farmerdashboard/getItemData/delete/:key", async (req, res) => {
  try {
    let data = await Item.deleteOne({ _id: req.params.key }, { writeConcern: { w: 'majority' } }); // Explicitly set write concern to 'majority'
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});


// Update Item
app.put("/api/farmerdashboard/getItemData/update/:_id", async (req, res) => {
  // console.log(req.params); // req.params here stores id in object
  try {
    let data = await Item.updateOne(
      // {condition in object}, {$set:}
      req.params, // req.params -> already an object
      {
        $set: req.body,
      },
      { writeConcern: { w: 'majority' } } // Explicitly set write concern to 'majority'
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});


app.listen(4500);
