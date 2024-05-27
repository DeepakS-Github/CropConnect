import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import FAQSkeleton from "../../components/skeleton/FAQSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useFaqs from "../../hooks/faqs/useFaqs";

function FAQ() {
  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFAQsFetchingFirstTime, setIsFAQsFetchingFirstTime] = useState(true);

  const { getFaqs, isLoading } = useFaqs();

  const productData = useSelector((state) => state.productReducer);

  useEffect(() => {
    const getReview = async () => {
      let data = await getFaqs(productData?._id, currentPage);
      if (data.length === 0) {
        setReachedEnd(true);
      }
      setReviewData([...reviewData, ...data]);
      setIsFAQsFetchingFirstTime(false);
    };

    getReview();
  }, [currentPage]);

  return (
    <>
      <div className="w-11/12 mx-auto flex flex-wrap pb-12">
        <div className="container mx-auto">
          <section className=" text-gray-900">
            <Heading
              text="Frequently asked questions"
              marginY="mt-2 mb-4 md:my-6"
              textAlign="text-center"
            />

            {isFAQsFetchingFirstTime ? (
              <FAQSkeleton />
            ) : reviewData.length === 0 ? (
              <EmptyStateText text="No FAQs yet! Have a question about this product? Be the first to ask! Your inquiry could help others too. Start the conversation now!" />
            ) : (
              <div className="grid lg:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-12">
                {reviewData.map((data) => (
                  <div>
                    <p className="font-bold mb-1 md:mb-4 text-pink-500">
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
                  {isLoading && (
                      <Spinner width="w-5" color="#ffffff" />
                  )}
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
