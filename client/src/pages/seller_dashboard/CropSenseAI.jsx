import React, { useState } from "react";
import Heading from "../../components/heading/Heading";
import { postAPI } from "../../utils/api/postRequest";
import Spinner from "../../components/loading/Spinner";

const CropSenseAI = () => {
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    soil: "",
    altitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const predictCrops = async () => {
    setIsLoading(true);

    let res = await postAPI(
      "ai/crops",
      {
        // soil: "sandy soil",
        // altitude: 1,
        // temperature: 30,
        // humidity: 80,
        // rainfall: 100,
        soil: formData.soil,
        altitude: formData.altitude,
        temperature: formData.temperature,
        humidity: formData.humidity,
        rainfall: formData.rainfall,
      },
      false
    );
    setPrediction(res.message);
    setIsLoading(false);
  };

  return (
    <>
      <Heading text={"Crop Predictor"} textAlign="text-left" />
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-white px-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-full">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="soil">Soil</label>
                    <select
                      name="crop"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={(e) => {
                        setFormData({ ...formData, soil: e.target.value });
                      }}
                    >
                      <option value="" selected disabled>
                        Select Soil
                      </option>
                      <option value="sandy soil">Sandy Soil</option>
                      <option value="clay soil">Clay Soil</option>
                      <option value="silt soil">Silt Soil</option>
                      <option value="peat soil">Peat Soil</option>
                      <option value="chalk soil">Chalk Soil</option>
                      <option value="loam soil">Loam Soil</option>
                    </select>
                  </div>

                  <div className="md:col-span-6">
                    <label htmlFor="altitude">Altitude (in km)</label>
                    <input
                      type="number"
                      name="altitude"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Between 0 and 10 (kilometers)"
                      value={formData.altitude}
                      onChange={(e) => {
                        setFormData({ ...formData, altitude: e.target.value });
                      }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="temperature">Temperature (in °C)</label>
                    <input
                      type="number"
                      name="temperature"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Between -50 and 50 (°Celsius)"
                      value={formData.temperature}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          temperature: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="humidity">Humidity (in %)</label>
                    <input
                      type="number"
                      name="humidity"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Between 0 and 100 (%)"
                      value={formData.humidity}
                      onChange={(e) => {
                        setFormData({ ...formData, humidity: e.target.value });
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="rainfall">Rainfall (in mm)</label>
                    <input
                      type="number"
                      name="rainfall"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Between 0 and 1000 (mm)"
                      value={formData.rainfall}
                      onChange={(e) => {
                        setFormData({ ...formData, rainfall: e.target.value });
                      }}
                    />
                  </div>

                  <div className="md:col-span-6 my-2 text-right">
                    <div
                      className="inline-flex text-white justify-center items-center bg-rose-700 hover:bg-rose-600text-white font-semibold py-2 px-4 rounded cursor-pointer"
                      onClick={() => {
                        predictCrops();
                      }}
                    >
                      {isLoading && (
                        <span className="mr-1">
                          {" "}
                          <Spinner width="w-5" color="#ffffff" />
                        </span>
                      )}
                      Predict Crops
                    </div>
                  </div>

                  <div className="md:col-span-full">
                    <textarea
                      rows={12}
                      className="border py-2 mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="AI Prediction will be shown here. Note: This prediction may not be accurate. Please consult an expert for better results. Powered by Gemini AI."
                      readOnly={true}
                      value={prediction}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropSenseAI;
