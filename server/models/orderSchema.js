const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  orderQty: {
    type: Number,
    required: true,
  },
  orderLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true
    }
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "sellers",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.index({ sellerId: 1, location: "2dsphere"  });

module.exports = mongoose.model("orders", orderSchema);
