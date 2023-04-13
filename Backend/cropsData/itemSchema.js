const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true  
    },
    brand: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }, 
    currentprice: {
        type: Number,
        required: true
    },
    originalprice: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('items',itemSchema);