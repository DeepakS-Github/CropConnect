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
    measuringUnit: {
        type: String, 
        required: true
    },
    orderQty: {
        type: Number,
        required: true
    },
    customerName: {
        type: String, 
        required: true
    },
   customerPhoneNo: {
        type: Number,
        required: true
    },
    customerEmail: {
        
        type: String,
        required: true
    },
    orderLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number, 
            required: true
        }
    },
    totalPrice: {
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