const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true  
    }, 
    itemsId: {
        type: Array,
        items: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }
    
})


module.exports = mongoose.model('cart',cartSchema);