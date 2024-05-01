require("./config/connectDB.js");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { setupWebSocket } = require("./services/setupWebSocket");

const product = require("./routes/product");
const review = require("./routes/review");
const cart = require("./routes/cart");
const otp = require("./routes/otp");
const order = require("./routes/order");
const faq = require("./routes/faq");
const graph = require("./routes/graph.js")
const ai = require("./routes/ai.js")
const auth = require("./routes/auth");

const PORT = 8080;
const app = express();

app.use(cors(
  {
    origin: ["https://localhost:5173", "https://crop-connect-lime.vercel.app"],
    credentials: true
  }
));

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

setupWebSocket(io);

// Health Check
app.get("/", (req, res) => {
  res.send("CropConnect Server is running");
});

// Routes
app.use("/auth", auth);
app.use("/product", product);
app.use("/review", review);
app.use("/cart", cart);
app.use("/otp", otp);
app.use("/order", order);
app.use("/faq", faq);
app.use("/graph", graph);
app.use("/ai", ai);


server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
