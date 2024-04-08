const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function cropPredictorServices(soil, altitude, temperature, humidiy, rainfall) {

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt =
    `Predict the crops and give me data based on these environmental factors: Soil type: ${soil} Altitude (in km): ${altitude} Temperature (in degree Celsius): ${temperature} Humidity (in %): ${humidiy} Rainfall (in mm): ${rainfall} Note: Ensure the following conditions are met: - Altitude should be a numerical value between 0 and 10 (kilometers). - Temperature should be a numerical value between -50 and 50 (degree Celsius). - Humidity should be a numerical value between 0 and 100 (%). - Rainfall should be a numerical value between 0 and 1000 (mm).`;


    // For streaming purpose
    //   const result = await model.generateContentStream(prompt);

    //   let text = "";
    //   for await (const chunk of result.stream) {
    //     const chunkText = chunk.text();
    //     console.log(chunkText);
    //     text += chunkText;
    //   }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

module.exports = {
  cropPredictorServices,
};

