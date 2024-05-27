const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'products'
    },  
    stars: {
        type: Number,
        required: true
    },
    heading: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


// Define a unique compound index on userId and productId
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });


module.exports = mongoose.model('reviews',reviewSchema);