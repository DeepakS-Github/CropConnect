import React from "react";
import useHttpClient from "../api/useHttpClient";
import {
  ADD_PRODUCT_FAQ,
  GET_PRODUCT_FAQS,
} from "../../constants/apiEndpoints";

const useFaqs = () => {
  const { sendRequest, sendAuthorizedRequest, isLoading } = useHttpClient();

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

  const addFaq = async (productId, faqData) => {
    try {
      await sendAuthorizedRequest(
        "user",
        ADD_PRODUCT_FAQ(productId),
        "POST",
        faqData
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { getFaqs, addFaq, isLoading };
};

export default useFaqs;
