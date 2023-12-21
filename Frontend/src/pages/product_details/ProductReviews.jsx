import React, { useEffect, useState } from "react";
import Rating from "../../components/Rating";
import { notify } from "../../utils/helper/notification";
import { useSelector } from "react-redux";
import { postAPI } from "../../utils/api/postRequest";
import { getAPI } from "../../utils/api/getRequest";
import Spinner from "../../components/Spinner";

function ProductReviews() {
  const productData = useSelector((state) => state.productReducer);
  const userData = useSelector((state) => state.userReducer);

  const [rate, setRate] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    userId: (userData)?userData._id:null,
    productId: productData._id,
    stars: rate,
    heading: "",
    description: "",
  });

  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = () => {
    if(userData===null){
      notify("Please login as a user first","info");
      return;
    }

    if (reviewForm.heading === "" || reviewForm.description === "") {
      notify("Please fill the review form correctly!", "info");
      return;
    }
    if (rate === 0) {
      notify("Please select the stars of the product", "notify");
      return;
    }

    setReviewForm((prevData) => ({ ...prevData, stars: rate }));
  };

  useEffect(() => {
    const postData = async () => {
      if (
        reviewForm.heading !== null &&
        reviewForm.description !== null &&
        reviewForm.stars != 0
      ) {
        try {
          console.log(reviewForm);
          setIsSubmitting(true);
          await postAPI("review/add", reviewForm);
          // setReviewData([reviewForm, ...reviewData]);
          setRate(0);
          setReviewForm({
            ...reviewForm,
            stars: 0,
            heading: "",
            description: "",
          });
          setIsSubmitting(false);
        } catch (error) {
          // Handle error if the API call fails
          console.error("Error posting review:", error);
        }
      }
    };

    postData();
  }, [reviewForm]);

  useEffect(() => {
    const getReview = async () => {
      setIsLoading(true);
      let data = await getAPI(`review/get?page=${currentPage}&per_page=2&productId=${productData._id}`);
      if (data.length === 0) {
        setReachedEnd(true);
      }
      setReviewData([...reviewData, ...data]);
      setIsLoading(false);
    };

    getReview();
  }, [currentPage]);

  return (
    <div className="lg:w-11/12 mx-auto flex mt-24 flex-wrap">
      <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-full space-y-8">
          <div className="flex w-full justify-center items-start">
            <h2 className="text-gray-900 text-center text-3xl title-font font-medium">
              Reviews
            </h2>
          </div>

          <form
            className="w-full gap-2 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleReviewSubmit();
            }}
          >
            <div className="w-full flex flex-row gap-2">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-8/12 p-4"
                value={reviewForm.heading}
                onChange={(e) =>
                  setReviewForm((prevData) => ({
                    ...prevData,
                    heading: e.target.value,
                  }))
                }
                placeholder="Write review heading..."
              ></input>
              <div className="bg-gray-50 border border-gray-300 rounded-lg flex justify-center items-center w-2/12">
                <Rating rate={rate} setRate={setRate} size="text-2xl" />
              </div>
              <button
                className="w-2/12 text-base py-2 px-4 flex flex-row justify-center items-center text-white font-medium rounded cursor-pointer uppercase bg-teal-500"
                type="submit"
              >
                <span className="mr-1">
                  {isSubmitting ? (
                    <Spinner width="w-6" color="#ffffff" />
                  ) : null}
                </span>
                Submit
              </button>
            </div>
            <textarea
              rows="6"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
              placeholder="Write your review description here..."
              value={reviewForm.description}
              onChange={(e) =>
                setReviewForm((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </form>

          {reviewData.map((item, index) => (
            <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="flex flex-row justify-between items-start">
                  <p className="text-xl md:text-2xl font-medium leading-normal text-teal-600">
                    {item.heading}
                  </p>
                </div>
                <div className="cursor-p  ointer mt-2 md:mt-0">
                  <Rating rate={item.stars} size="text-lg" />
                </div>
              </div>
              <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
                {item.description}
              </p>
              {/* <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                <div className="hidden md:block">
                  <img
                    src={`https://source.unsplash.com/random/120x120?rice,indrink`}
                    alt="chair-3"
                  />
                </div>
                <div className="hidden md:block">
                  <img
                    src={`https://source.unsplash.com/random/120x120?rice,indrawer`}
                    alt="chair-4"
                  />
                </div>
              </div> */}
            </div>
          ))}

          {!reachedEnd && (
            <div className="w-full text-center flex justify-center">
              <button
                className="text-base py-2 px-8 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer bg-teal-500"
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
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
