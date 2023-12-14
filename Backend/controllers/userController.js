const User = require('../models/userSchema');
const Review = require('../models/reviewSchema');
const Cart = require("../models/cartSchema");

const { sendMail } = require('./mailController');

// SignUp
const signup = async (req, res) => {
    try {
        let data = User(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } });
        console.log(result);
        sendMail(req.body.email, "User account created", req.body.name, "Welcome to CropConnect");
        return res.status(200).send({message: 'User account created'});
    } catch (error) {
        if (error.code === 11000 && (error.keyPattern.email || error.keyPattern.phoneNo)) {
            return res.status(400).send({message: 'User with this email or phone number already exists'});
        }
        console.log(error);
        return res.status(500).send({message: 'Something went wrong!'});
    }
}


// Login
const login = async (req, res) => {
    try {
        let data = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!data) {
            res.status(404);
            return res.send({message: "User not found"});
        }
        else {
            return res.status(200).send({message: "User login sucessful", userData: {_id:data._id, name: data.name, email: data.email, phoneNo: data.phoneNo}});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'Something went wrong!'});
    }
}


// Delete User Account
const deleteUserAccount = async (req, res) => {
    try {
         // Find and delete user data from other collections
         await Promise.all([
            Cart.deleteMany({ userId: req.params.userId }),
            Review.deleteMany({ userId: req.params.userId  }),
        ]);

        let data = await User.deleteOne({ _id: req.params.userId }, { writeConcern: { w: 'majority' } });
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send('Something went wrong!');
        console.log(error);
    }
}


module.exports = {
    signup,
    login,
    deleteUserAccount
};