const Product = require("../models/productSchema");

function setupWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    const changeStream = Product.watch();

    changeStream.on("change", (change) => {
      if (
        change.operationType === "update" &&
        change.updateDescription.updatedFields &&
        change.updateDescription.updatedFields.pricePerUnit &&
        change.updateDescription.updatedFields.quantity && 
        change.updateDescription.updatedFields.minimumOrderQuantity
      ) {
        socket.emit(
          "productUpdate",
          {
            price: change.updateDescription.updatedFields.pricePerUnit,
            quantity: change.updateDescription.updatedFields.quantity,
            minQty: change.updateDescription.updatedFields.minimumOrderQuantity
          }
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { setupWebSocket };
