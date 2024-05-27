import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import LeafletMap from "../../components/map/LeafletMap";
import useFaqs from "../../hooks/faqs/useFaqs";

function SellerContact() {
  const productData = useSelector((state) => state.productReducer);
  const { addFaq, isLoading } = useFaqs();

  const position = [
    productData?.location?.latitude,
    productData?.location?.longitude,
  ];


  const [feedbackForm, setFeedbackForm] = useState({
    question: null,
  });

  const submitFeedbackForm = async () => {
    const isSuccess = await addFaq(productData?._id, {
      ...feedbackForm,
      sellerId: productData?.sellerId,
    });
    if (isSuccess) {
      setFeedbackForm((prev) => ({ ...prev, question: null }));
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-wrap">
        <section className="text-gray-600 w-full body-font relative">
          <div className="w-full mx-auto flex flex-col md:flex-row gap-10">
            <div className="w-full h-60 md:h-[512px] lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden flex md:items-end md:justify-start relative z-40">
              <LeafletMap
                width="w-full"
                height="h-full"
                latitude={position[0]}
                longitude={position[1]}
                showSearchBox={false}
              />
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
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 h-40 md:h-64 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={feedbackForm.question}
                    placeholder="Type your message here..."
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
                  {isLoading ? <Spinner width="w-5" color="#ffffff" /> : null}
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
