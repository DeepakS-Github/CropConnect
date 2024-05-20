import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GET_PRODUCT_REVIEWS } from "../../constants/apiEndpoints";

const useReviews = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const getReviews = async (productId, page, review_per_page = 2) => {
    let reviews = await sendRequest(
      GET_PRODUCT_REVIEWS(productId, page, review_per_page)
    );
    return reviews.data;
  };

  return { getReviews, isLoading };
};

export default useReviews;
