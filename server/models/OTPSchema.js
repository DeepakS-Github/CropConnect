const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('otp',OTPSchema);