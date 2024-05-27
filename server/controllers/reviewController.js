const Review = require("../models/reviewSchema");
const Product = require("../models/productSchema");

// Add Review
const addReview = async (req, res) => {
  try {
    req.body.userId = req.userId;
    req.body.productId = req.params.productId;
    let data = Review(req.body);
    let result = await data.save();
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
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
};

// Get Paginated Review
const getPaginatedReview = async (req, res) => {
  try {
    const review_per_page = req.query.review_per_page;
    const page = req.query.page;

    let skip = (page - 1) * review_per_page;

    let data = await Review.find({
      productId: req.params.productId,
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(review_per_page)
      .lean();

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
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
  getPaginatedReview,
};
