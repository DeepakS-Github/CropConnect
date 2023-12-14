const Cart = require("../models/cartSchema");


// Add Cart Item
const addCartItem = async (req, res) => {
    try {
        let data = Cart(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } });
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.userId && error.keyPattern.productId) {
            // Duplicate product detected (userId and productId already exist as a unique pair)
            res.status(400).send("This product in cart already exists.");
        } else {
            res.status(500).send("Something went wrong!");
            console.log(error);
        }
    }
}


// Show Cart Item by User ID
const showCartItem = async (req, res) => {
  try {
    let data = await Cart.find({ userId: req.params.userId });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
}


// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const data = await Cart.deleteOne({ productId: req.params.productId, userId: req.params.userId}, { writeConcern: { w: 'majority' } });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
}


// Increase Quantity of a product in cart
const increaseQty = async (req, res) => {
    try {
        const cartItem = await Cart.find({ userId: req.params.userId, productId: req.params.productId })
        cartItem[0].quantity = cartItem[0].quantity + 1;
        let result = await cartItem[0].save({ writeConcern: { w: 'majority' } });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("Something went wrong!");
        console.log(error);
    }
}


// Decrease Quantity of a product in cart
const decreaseQty = async (req, res) => {
    try {
        const cartItem = await Cart.find({ userId: req.params.userId, productId: req.params.productId })
        if(cartItem[0].quantity===1){
            res.status(400).send("Cannot be decreased more");
        }
        else{
            cartItem[0].quantity = cartItem[0].quantity - 1;
            await cartItem[0].save({ writeConcern: { w: 'majority' } });
            res.status(200).send(cartItem);
        }
    } catch (error) {
        res.status(500).send("Something went wrong!");
        console.log(error);
    }
}
  


module.exports = {
    addCartItem,
    showCartItem,
    deleteCartItem,
    increaseQty,
    decreaseQty
};


