import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GET_PRODUCT_REVIEWS } from "../../constants/apiEndpoints";

const useReviews = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const getReviews = async (productId, page, review_per_page = 2) => {
    let reviews = await sendRequest(
      `${GET_PRODUCT_REVIEWS}/${productId}?page=${page}&review_per_page=${review_per_page}`
    );
    return reviews;
  };

  return { getReviews, isLoading };
};

export default useReviews;
