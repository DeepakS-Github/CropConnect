import React from "react";
import { useState } from "react";
import axios from "axios";

function InsecticidePredictor() {
  const [crops, setCrops] = useState("");

  let [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);

    let userQues = `crops: ${crops}. Recommed me the insecticides that can be grown in India for the given crop. Write insecticide name and some text for explanation`;

    axios
      .post("http://localhost:8080/chat", { prompt: userQues })
      .then((res) => {
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">
                    Insecticide Predictor
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
                            Find
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className="md:col-span-6">
                      <label for="address">Insecticides</label>
                      <p
                        id="w3review"
                        name="w3review"
                        className="resize-none h-auto border mt-1 py-4 rounded px-4 w-full bg-gray-50"
                      >
                        {response}
                      </p>
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

export default InsecticidePredictor;
