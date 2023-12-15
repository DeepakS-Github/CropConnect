require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const user = require("./routes/user");
const seller = require("./routes/seller");
const product = require("./routes/product");
const review = require("./routes/review");
const cart = require("./routes/cart");
const otp = require("./routes/otp");
const order = require("./routes/order");
const faq = require("./routes/faq");

const session = require("express-session");

const PORT = 8080;
const app = express();

app.use(cors());

app.use(
  session({
    secret: "donottakethis",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 } // For 5 min
  })
);
app.use(express.json());

app.use("/user", user);
app.use("/seller", seller);
app.use("/product", product);
app.use("/review", review);
app.use("/cart", cart);
app.use("/otp", otp);
app.use("/order",order);
app.use("/faq", faq);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
