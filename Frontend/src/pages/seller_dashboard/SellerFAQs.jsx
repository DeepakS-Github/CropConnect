import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getAPI } from "../../utils/api/getRequest";
import { useDispatch, useSelector } from "react-redux";
import { putAPI } from "../../utils/api/putRequest";
import Spinner from "../../components/Spinner";
import { notify } from "../../utils/helper/notification";
import { useNavigate } from "react-router-dom";
import { addProductData } from "../../redux/actions";
import FAQSellerSkeleton from "../../components/skeleton/FAQSellerSkeleton";

function SellerFAQs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sellerData = useSelector((state) => state.sellerReducer);

  const [openFAQ, setOpenFAQ] = useState(null);
  const [answer, setAnswer] = useState("");

  const [answeredFAQ, setAnsweredFAQ] = useState([]);
  const [unansweredFAQ, setUnansweredFAQ] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const submitAnswer = async (faqId) => {
    setLoading(true);
    if (answer === "") {
      notify("Please answer something", "warn");
      setLoading(false);
      return;
    }
    try {
      let statusCode = await putAPI(`faq/ansfaq/${faqId}`, {
        answer: answer,
      });
      if (statusCode === 200) {
        let faq;
        unansweredFAQ.map((data, index) => {
          if (data._id === faqId) {
            faq = data;
            faq["answer"] = answer;
            unansweredFAQ.splice(index, 1);
          }
        });
        setAnsweredFAQ([...answeredFAQ, faq]);
        setOpenFAQ(null);
        setAnswer("");
      }
      setLoading(false);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error posting data:", error);
      setLoading(false);
    }
  };

  const seeProduct = async (productId) => {
    let data = await getAPI(`product/getProductDataById/${productId}`);

    console.log(data);

    dispatch(addProductData(data));
    navigate("/category/fruits/details");
  };

  const getUnansweredFAQs = async () => {
    let data = await getAPI(
      `faq/showbyseller?sellerId=${sellerData._id}&isAnswered=false`
    );
    setUnansweredFAQ(data);
  };

  const getAnsweredFAQs = async () => {
    let data = await getAPI(
      `faq/showbyseller?sellerId=${sellerData._id}&isAnswered=true`
    );
    setAnsweredFAQ(data);
  };

  const fetchFAQs = async () => {
    await getAnsweredFAQs();
    await getUnansweredFAQs();
    setIsDataFetching(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-medium mb-4 px-4">All FAQs</h1>
      {isDataFetching ? (
        <FAQSellerSkeleton />
      ) : (
        <div className="px-4 mx-auto grid grid-cols-2 gap-4 my-4">
          {unansweredFAQ.map((data) => (
            <div className="flex flex-row gap-4 bg-gray-100 rounded p-4">
              <div className="w-8 h-8 flex justify-center">
                <MdOutlineKeyboardArrowDown
                  className={`text-3xl cursor-pointer text-red-700 p-[1px] bg-red-200 rounded-sm ${
                    data._id === openFAQ ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => {
                    setOpenFAQ(data._id === openFAQ ? null : data._id);
                  }}
                />
              </div>
              <div className={`flex flex-col gap-2 w-full`}>
                <span className="font-medium flex gap-2 items-center">
                  <span>{data.question}</span>
                  <button
                    className="text-xs flex justify-center items-center text-red-600 px-[6px] py-[1px] border border-red-600 rounded-full"
                    onClick={() => {
                      seeProduct(data.productId);
                    }}
                  >
                    See Product
                  </button>
                </span>
                <span
                  className={`text-sm text-gray-700 flex flex-col gap-2 ${
                    data._id === openFAQ ? "block" : "hidden"
                  }`}
                >
                  <textarea
                    placeholder="Answer here..."
                    className="h-32 w-full outline-none rounded-md bg-transparent border border-gray-500 p-2 text-sm text-gray-700"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    className="bg-red-600 text-white py-2 font-medium rounded-md flex flex-row justify-center items-center"
                    onClick={() => {
                      submitAnswer(data._id);
                    }}
                  >
                    <span className="mr-1">
                      {loading ? <Spinner width="w-5" color="#ffffff" /> : null}
                    </span>
                    Submit
                  </button>
                </span>
              </div>
            </div>
          ))}
          {answeredFAQ.map((data) => (
            <div className="flex flex-row gap-4 bg-gray-100 rounded p-4">
              <div className="w-8 h-8 flex justify-center">
                <MdOutlineKeyboardArrowDown
                  onClick={() => {
                    setOpenFAQ(data._id === openFAQ ? null : data._id);
                  }}
                  className={`text-3xl cursor-pointer text-green-700 p-[1px] bg-green-200 rounded-sm ${
                    data._id === openFAQ ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="font-medium flex gap-2 items-center">
                  <span>{data.question}</span>
                  <button
                    className="text-xs flex justify-center items-center text-green-700 px-[6px] py-[1px] border border-green-700 rounded-full"
                    onClick={() => {
                      seeProduct(data.productId);
                    }}
                  >
                    See Product
                  </button>
                </span>
                <span
                  className={`text-sm text-gray-700 flex flex-col gap-2 ${
                    data._id === openFAQ ? "block" : "hidden"
                  }`}
                >
                  {data.answer}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SellerFAQs;
