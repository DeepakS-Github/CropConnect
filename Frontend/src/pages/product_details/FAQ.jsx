import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { getAPI } from "../../utils/api/getRequest";
import FAQSkeleton from "../../components/skeleton/FAQSkeleton";

function FAQ() {
  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const productData = useSelector((state) => state.productReducer);

  useEffect(() => {
    const getReview = async () => {
      setIsLoading(true);
      let data = await getAPI(
        `faq/showbyproduct?productId=${productData._id}&page=${currentPage}&faq_per_page=6`
      );
      console.log(data);
      if (data.length === 0) {
        setReachedEnd(true);
      }
      setReviewData([...reviewData, ...data]);
      setIsLoading(false);
      setIsDataFetching(false);
    };

    getReview();
  }, [currentPage]);

  return (
    <>
      <div className="lg:w-11/12 mx-auto flex flex-wrap">
        <div className="container mt-24 px-6 mx-auto">
          <section className=" text-gray-900">
            <h2 className="text-gray-900 text-center text-3xl title-font font-medium mb-12">
              Frequently asked questions
            </h2>

            {isDataFetching ? (
              <FAQSkeleton />
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                {reviewData.map((data) => (
                  <div className="mb-12">
                    <p className="font-bold mb-4 text-pink-500">
                      {data.question}
                    </p>
                    <p className="text-gray-500">{data.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {!reachedEnd && (
              <div className="w-full text-center my-6 flex justify-center">
                <button
                  className="text-base py-2 px-8 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer bg-pink-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prevPage) => prevPage + 1);
                  }}
                >
                  <span className="mr-1">
                    {isLoading ? <Spinner width="w-5" color="#ffffff" /> : null}
                  </span>
                  Load More
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default FAQ;
