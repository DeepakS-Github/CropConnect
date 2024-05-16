const { cropPredictorServices } = require("../services/cropPredictorServices");


// Crop Prediction
const predictCrops = async (req, res) => {
  try {

    const { soil, altitude, temperature, humidity, rainfall } = req.query;
    
    if (!soil || !altitude || !temperature || !humidity || !rainfall) {
      return res.status(400).send("Missing parameters");
    }

    const altitudeNum = parseFloat(altitude);
    const temperatureNum = parseFloat(temperature);
    const humidityNum = parseFloat(humidity);
    const rainfallNum = parseFloat(rainfall);

    if (isNaN(altitudeNum) || isNaN(temperatureNum) || isNaN(humidityNum) || isNaN(rainfallNum)) {
      return res.status(400).send("Invalid parameters");
    }

    const result = await cropPredictorServices(soil, altitudeNum, temperatureNum, humidityNum, rainfallNum);
    console.log(result);
    return res.status(200).send({ message: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong!");
  }
};


module.exports = {
  predictCrops,
};
