import React from "react";
import { useState } from 'react';
import axios from "axios";





function CropPredictor() {
    const [soil, setSoil] = useState('');
    const [altitude, setAltitude] = useState('');
    const [humidity, setHumidity] = useState('');
    const [temperature, setTemperature] = useState('');
    const [region, setRegion] = useState('');
    const [rainfall, setRainfall] = useState('');


    let [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = (e) =>{
      e.preventDefault();

      let userQues =  `region: ${region}, soil: ${soil}, temperature: ${temperature}, altitude: ${altitude}, humidity: ${humidity}, rainfall: ${rainfall}. Recommed me the crops that can be grown in India following the given conditions. Write in points, the crops name and some text for explanation.`;

      axios
        .post("http://localhost:8080/chat", {prompt: userQues})
        .then((res)=>{
          setResponse(res.data);
          console.log(res.data);
        })
        .catch((err)=>{
          console.log(err);
        });
    }
    

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Crop Predictor</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div>
                  <form onSubmit={handleSubmit}  className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label for="full_name">Region</label>
                      <select
                        onChange={(e) => setRegion(e.target.value)}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      >
                        <option selected disabled>Select</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North-East">North-East</option>
                        <option value="North-West">North-West</option>
                        <option value="South-East">South-East</option>
                        <option value="South-West">South-West</option>
                      </select>
                    </div>

                    <div className="md:col-span-6">
                      <label for="full_name">Soil</label>
                      <select
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setSoil(e.target.value)} 
                      >
                        <option selected disabled>Select</option>
                        <option value="Alluvial Soil">Alluvial Soil</option>
                        <option value="Black Cotton Soil">Black Cotton Soil</option>
                        <option value="Laterite Soil">Laterite Soil</option>
                        <option value="Arid or Desert Soil">Arid or Desert Soil</option>
                        <option value="Saline and Alkaline Soil">Saline and Alkaline Soil</option>
                        <option value="Peaty and Marshy Soil">Peaty and Marshy Soil</option>
                      </select>
                    </div>

                    <div className="md:col-span-6">
                      <label for="full_name">Altitude (in km)</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setAltitude(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label for="email">
                        Temperature (in <sup>°</sup>C)
                      </label>
                      <input
                        type="number"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setTemperature(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label for="email">
                        Humidity (in gm<sup>-3</sup>)
                      </label>
                      <input
                        type="number"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setHumidity(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label for="email">
                        Rainfall (in mm<sup>3</sup>)
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setRainfall(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-6 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Find
                        </button>
                      </div>    
                    </div>
                    </form>

                  <div className="md:col-span-6">
                      <label for="address">Crops</label>

                      <p
                        id="w3review"
                        name="w3review"
                        className="resize-none h-auto border mt-1 py-4 rounded px-4 w-full bg-gray-50"
                      >{response}</p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CropPredictor;
