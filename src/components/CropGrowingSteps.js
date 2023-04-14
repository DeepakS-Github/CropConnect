import React from "react";
import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function CropGrowingSteps() {
  const [crops, setCrops] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
    setLoading(true);

    let userQues = `crops: ${crops}. Give the steps to grow this crop in India. If this is not the crop then give error statement`;

    axios
        .post("http://localhost:8080/chat", {prompt: userQues})
        .then((res)=>{
          let modifiedText = res.data.message.replace(/\n/g, "<br>");
          document.getElementById("steps").innerHTML = modifiedText;
          console.log(res.data);
          setLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          setLoading(false);
          alert("Something went wrong. Try again later!");
        });
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
                  How to Grow Crop
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
                      <label for="address">Steps</label>
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
