const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
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
        // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('signups',signupSchema);