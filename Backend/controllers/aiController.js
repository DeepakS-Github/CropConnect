const { cropPredictorServices } = require("../services/cropPredictorServices");


// Crop Prediction
const predictCrops = async (req, res) => {
  try {
    let result = await cropPredictorServices(req.body.soil, req.body.altitude, req.body.temperature, req.body.humidity, req.body.rainfall);
    console.log(result);
    res.status(200).send({message: result});
  } catch (error) {
    res.status(500).send("Something went wrong!");
    console.log(error);
  }
};

module.exports = {
  predictCrops,
};
