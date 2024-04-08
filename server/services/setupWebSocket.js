const Product = require("../models/productSchema");

function setupWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    const changeStream = Product.watch();

    changeStream.on("change", (change) => {
      if (
        change.operationType === "update" &&
        change.updateDescription.updatedFields &&
        change.updateDescription.updatedFields.quantity
      ) {
        socket.emit(
          "stockUpdate",
          change.updateDescription.updatedFields.quantity
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { setupWebSocket };
