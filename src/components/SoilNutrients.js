import React from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function CropGrowingSteps() {
  const [crops, setCrops] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prompt);
    setLoading(true);

    
    let userQues = `If I want to grow ${crops} then what are the parameters of the soil I need write their units also. Give answers in points.`;

    const url = "https://smartgpt-api.p.rapidapi.com/ask";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8505c9ce07msh2397bcfad35ce0ap1a997ajsn8564acd48860",
        "X-RapidAPI-Host": "smartgpt-api.p.rapidapi.com",
      },
      body: JSON.stringify({
        query:  `${userQues}`
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const obj = JSON.parse(result);
      let modifiedText = obj.response.replace(/\n/g, "<br>");
      document.getElementById("steps").innerHTML = modifiedText;
      setLoading(false);
      console.log(obj.response);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto  mt-32">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">
                  Predict Soil Nutrients
                  </p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div>
                    <form
                      onSubmit={handleSubmit}
                      className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-6"
                    >
                      <div className="md:col-span-6">
                        <label for="full_name">Crop</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          onChange={(e) => setCrops(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-6 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          {(loading)?<Spinner/>:"Find"}
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className="md:col-span-6">
                      <label for="address">Required Soil Nutrients</label>
                      <div
                        id="steps"
                        name="w3review"
                        className="resize-none h-auto border mt-1 py-4 rounded px-4 w-full bg-gray-50"
                      ></div>
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

export default CropGrowingSteps;
