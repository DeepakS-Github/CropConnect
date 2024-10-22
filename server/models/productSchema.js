const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  measuringUnit: {
    type: String,
    required: true,
  },
  minimumOrderQuantity: {
    type: Number,
    required: true,
  },
  deliveryRadius: {
    type: Number,
    required: true
  },
  location: {
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
  quantity: {
    type: Number,
    required: true,
  },
  shelfLife: {
    type: String,
    required: true,
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

productSchema.index({ category: 1, sellerId: 1, location: "2dsphere" });

module.exports = mongoose.model("products", productSchema);
