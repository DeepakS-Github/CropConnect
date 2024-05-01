const Review = require("../models/reviewSchema");
const Product = require("../models/productSchema");

// Add Review
const addReview = async (req, res) => {
  try {
    req.body.userId = req.id;
    let data = Review(req.body);
    let result = await data.save({ writeConcern: { w: "majority" } });
    console.log(result);
    return res.status(200).send({ message: "Review successfully posted" });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.userId &&
      error.keyPattern.productId
    ) {
      // Duplicate review detected (userId and productId already exist as a unique pair)
      res.status(400).send({
        message: "You have already submitted a review for this product.",
      });
    } else {
      console.log(error);
      res.status(500).send("Something went wrong!");
    }
  }
};

// Get Paginated Review
const getPaginatedReview = async (req, res) => {
  try {
    const reviewPerPage = req.query.per_page;
    const data = await Review.find({ productId: req.query.productId });
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * reviewPerPage;
    const endIndex = page * reviewPerPage;
    const reviewForPage = data.slice(startIndex, endIndex);
    return res.status(200).send(reviewForPage);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

// Get Review+
const getReview = async (req, res) => {
  try {
    let data = await Review.find({ productId: req.params.productid });
    if (!data) {
      res.status(404);
      res.send("review not found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};


// Below one is slower, (by using ref) -> also removed the ref from productSchema
// const getReviewUsingRef = async (req, res) => {
//   try {
//     let data = await Product.findById(req.params.productId).populate(
//       "reviewIds"
//     );

//     if (!data) {
//       res.status(404);
//       res.send("review not found");
//     }
//     else{
//       console.log(data);
//       res.status(200).send(data.reviewIds);
//     }
//   } catch (error) {
//     res.status(500).send("Something went wrong!");
//   }
// };

module.exports = {
  addReview,
  getReview,
  getPaginatedReview,
};
