const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('sellers',sellerSchema);