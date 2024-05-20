import React from "react";
import useHttpClient from "../api/useHttpClient";
import {
  ADD_PRODUCT_REVIEW,
  GET_PRODUCT_REVIEWS,
} from "../../constants/apiEndpoints";
import { notify } from "../../utils/helper/notification";

const useReviews = () => {
  const { sendRequest, sendAuthorizedRequest, isLoading } = useHttpClient();

  const getReviews = async (productId, page, review_per_page = 2) => {
    try {
      let reviews = await sendRequest(
        GET_PRODUCT_REVIEWS(productId, page, review_per_page)
      );
      return reviews.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addReview = async (productId, reviewData) => {
    if (reviewData.heading === "" || reviewData.description === "") {
      notify("Please fill the review form correctly!", "info");
      return false;
    }
    if (reviewData.stars === 0) {
      notify("Please select the stars of the product", "info");
      return false;
    }

    try {
      await sendAuthorizedRequest(
        "user",
        ADD_PRODUCT_REVIEW(productId),
        "POST",
        reviewData
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { getReviews, addReview, isLoading };
};

export default useReviews;
