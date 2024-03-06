require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { setupWebSocket } = require("./services/setupWebSocket");

const user = require("./routes/user");
const seller = require("./routes/seller");
const product = require("./routes/product");
const review = require("./routes/review");
const cart = require("./routes/cart");
const otp = require("./routes/otp");
const order = require("./routes/order");
const faq = require("./routes/faq");

const PORT = 8080;
const app = express();

app.use(cors());

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

setupWebSocket(io);

app.use("/user", user);
app.use("/seller", seller);
app.use("/product", product);
app.use("/review", review);
app.use("/cart", cart);
app.use("/otp", otp);
app.use("/order", order);
app.use("/faq", faq);


server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
