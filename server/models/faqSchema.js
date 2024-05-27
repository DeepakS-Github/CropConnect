const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "sellers",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

faqSchema.index({ productId: 1, sellerId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("faqs", faqSchema);
