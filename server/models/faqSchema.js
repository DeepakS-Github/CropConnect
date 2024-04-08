const mongoose = require('mongoose');
const faqSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    question: {
        type: String, 
        required: true
    },
    answer: {
        type: String
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


faqSchema.index({ productId: 1, sellerId: 1 });

module.exports = mongoose.model('faqs',faqSchema);