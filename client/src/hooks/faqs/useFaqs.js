import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GET_PRODUCT_FAQS } from "../../constants/apiEndpoints";

const useFaqs = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const getFaqs = async (productId, page, faq_per_page = 6) => {
    try {
      const faqs = await sendRequest(
        GET_PRODUCT_FAQS(productId, page, faq_per_page)
      );
      return faqs.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getFaqs, isLoading };
};

export default useFaqs;
