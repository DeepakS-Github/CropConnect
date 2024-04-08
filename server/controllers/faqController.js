const FAQ = require("../models/faqSchema");

// Add FAQ
const addFAQ = async (req, res) => {
  try {
    let data = FAQ(req.body);
    let result = await data.save({ writeConcern: { w: "majority" } });
    console.log(result);
    res.status(200).send({
      message:
        "After the seller answers your question, we will send you an email to inform you.",
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

// Answering FAQ by Seller
const ansFAQ = async (req, res) => {
  try {
    let data = await FAQ.updateOne(
      { _id: req.params.faqId },
      { $set: { answer: req.body.answer, isAnswered: true } },
      { writeConcern: { w: "majority" } }
    );
    res.status(200).send({
      message: "Answered Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};


// Show Paginated FAQs by Product ID
const showFAQsbyProduct = async (req, res) => {
  try {
    let page = req.query.page;
    let faq_per_page = req.query.faq_per_page;
    let data = await FAQ.find({ productId: req.query.productId, isAnswered: true });
    let size = data.length;
    let skip = (page - 1) * faq_per_page;
    let stIndex = size - faq_per_page - skip;
    let endIndex = size - skip;
    if (stIndex < 0) {
      stIndex = 0;
    }
    if (endIndex < 0) {
      endIndex = 0;
    }
    let result = data.slice(stIndex, endIndex);
    res.status(200).send(result.reverse());
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

// Show Paginated FAQs by Seller ID
const showFAQsbySeller = async (req, res) => {
  try {
    let data = await FAQ.find({ sellerId: req.query.sellerId, isAnswered: req.query.isAnswered});
    res.status(200).send(data.reverse());
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = {
  addFAQ,
  showFAQsbyProduct,
  showFAQsbySeller,
  ansFAQ
};
