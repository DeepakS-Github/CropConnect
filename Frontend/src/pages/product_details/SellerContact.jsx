import React, { useEffect, useState } from "react";
import { postAPI } from "../../utils/api/postRequest";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";
import LeafletMap from "../../components/map/LeafletMap";

function SellerContact() {
  const productData = useSelector((state) => state.productReducer);
  const userData = useSelector((state) => state.userReducer);

  const position = [
    productData.location.latitude,
    productData.location.longitude,
  ];

  const [isLoading, setIsLoading] = useState(false);

  const [feedbackForm, setFeedbackForm] = useState({
    userId: userData?._id,
    name: null,
    email: null,
    question: null,
    productId: productData._id,
    sellerId: productData.sellerId,
  });

  const submitFeedbackForm = async () => {
    if(userData===null){
      console.log("e")
      notify("Login as user to send the feedback", "info");
      return;
    }

    setIsLoading(true);
    setFeedbackForm({...feedbackForm, userId: userData._id}); 
    console.log(feedbackForm);
    try {
      await postAPI("faq/add", feedbackForm);
      setIsLoading(false);
    } catch (error) {
      console.error("Error posting feedback form:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-wrap">
        <section className="text-gray-600 w-full body-font relative">
          <div className="w-full mx-auto flex flex-col md:flex-row gap-10">
            <div className="w-full h-72 md:h-[560px] lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden flex md:items-end md:justify-start relative z-40">
              <LeafletMap width="w-full" height="h-full" latitude={position[0]} longitude={position[1]} showSearchBox={false}/>
            </div>

            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full">
              <h2 className="text-green-600 text-lg mb-1 font-medium title-font">
                Contact Farmer
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600 text-sm md:text-base">
                Many farmers are more than happy to discuss their farming
                practices and answer any queries you may have about their
                products.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitFeedbackForm();
                }}
              >
                <div className="relative mb-4">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => {
                      setFeedbackForm({
                        ...feedbackForm,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => {
                      setFeedbackForm({
                        ...feedbackForm,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    required
                    onChange={(e) => {
                      setFeedbackForm({
                        ...feedbackForm,
                        question: e.target.value,
                      });
                    }}
                  ></textarea>
                </div>
                <button
                  className="text-white flex flex-row justify-center items-center bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="mr-1">
                      <Spinner width="w-5" color="#ffffff" />
                    </span>
                  ) : null}
                  Send
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                Using Feedback to Improve Quality
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SellerContact;
