const FAQ = require("../models/faqSchema");
const Seller = require("../models/sellerSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema");


// Add FAQ
const addFAQ = async (req, res) => {
    try {
        let data = FAQ(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } });

       const sellerId = req.body.sellerId; 
       const userId = req.body.userId;
       const productId = req.body.productId;
  
       await Seller.updateOne(
         { _id: sellerId },
         { $push: { faqIds: result._id } } 
       );
  
       await User.updateOne(
         { _id: userId },
         { $push: { faqIds: result._id } } 
       )

       await Product.updateOne(
         { _id: productId },
         { $push: { faqIds: result._id } } 
       )

        console.log(result);
        res.status(200).send("FAQ sent");
    } catch (error) {   
        res.status(500).send("Something went wrong!");
        console.log(error);
    }
}


// Show Paginated FAQs by Product ID
const showFAQsbyProduct = async (req, res) => {
  try {
    let page = req.query.page;
    let faq_per_page = req.query.faq_per_page;
    let data = await FAQ.find({ productId: req.query.productId });
    let size = data.length;
    let skip = (page-1)*faq_per_page;
    let stIndex = (size-faq_per_page)-skip;
    let endIndex = size-skip;
    if(stIndex<0){
        stIndex=0;
    }
    if(endIndex<0){
        endIndex = 0;
    }
    let result = data.slice(stIndex, endIndex);
    res.status(200).send(result.reverse());
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
}


// Show Paginated FAQs by Seller ID
const showFAQsbySeller = async (req, res) => {
    try {
      let page = req.query.page;
      let faq_per_page = req.query.faq_per_page;
      let data = await FAQ.find({ sellerId: req.query.sellerId });
      let size = data.length;
      let skip = (page-1)*faq_per_page;
      let stIndex = (size-faq_per_page)-skip;
      let endIndex = size-skip;
      if(stIndex<0){
          stIndex=0;
      }
      if(endIndex<0){
          endIndex = 0;
      }
      let result = data.slice(stIndex, endIndex);
      res.status(200).send(result.reverse());
    } catch (error) {
      res.status(500).send("Something went wrong!");
      console.log(error);
    }
  }
  


module.exports = {
    addFAQ,
    showFAQsbyProduct,
    showFAQsbySeller
};


