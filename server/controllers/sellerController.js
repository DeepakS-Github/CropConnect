const { sendMail } = require('./mailController');


const Seller = require('../models/sellerSchema');


// SignUp
const signup = async (req, res) => {
    try {
        let data = Seller(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } });
        console.log(result);
        // sendMail(req.body.email, "Seller account created", req.body.name, "Welcome to CropConnect");
        return res.status(200).send({message: "Seller account created"});
    } catch (error) {
        if(error.code===11000){
            if (error.keyPattern.email || error.keyPattern.phoneNo) {
                return res.status(400).send({message: 'Seller with this email or phone number already exists'});
            }
            else if(error.keyPattern.brandName){
                return res.status(409).send({message: 'This brand name already exists'});
            }
        }
        
        res.status(500).send({message: 'Something went wrong!'});
        console.log(error);
    }
}


// Login
const login =  async (req, res) => {
    try {

        let data = await Seller.findOne({ email: req.body.email, password: req.body.password });
        if (!data) {
            res.status(404);
            return res.send({message: "Seller not found"});
        }
        else {
            return res.status(200).send({message: "Seller login successful", sellerData: data, isLoggedIn: true});
        }
    } catch (error) {
        res.status(500).send({message: 'Something went wrong!'});
        console.log(error);
    }
}


// Delete Seller Account
const deleteSellerAccount = async (req, res) => {
    try {
         // Find and delete user data from other collections
         await Promise.all([
            Product.deleteMany({ sellerId: req.params.sellerId }),
        ]);

        let data = await Seller.deleteOne({ _id: req.params.sellerId }, { writeConcern: { w: 'majority' } });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!');
        console.log(error);
    }
}



module.exports = {
    signup,
    login,
    deleteSellerAccount
};