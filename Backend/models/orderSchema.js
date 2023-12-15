const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    pricePerUnit: {
        type: Number, 
        required: true
    },
    measuringUnit: {
        type: String, 
        required: true
    },
    orderQty: {
        type: Number,
        required: true
    },
    orderLocation: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    minOrderQty: {
        type: Number,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

orderSchema.index({ sellerId: 1 });



module.exports = mongoose.model('orders',orderSchema);