import React from "react";
import useHttpClient from "../api/useHttpClient";
import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_DASHBOARD_DATA,
} from "../../constants/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { addProductData } from "../../redux/actions";

const useProducts = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productReducer);

  const getProductsByCategory = async (category) => {
    const products = await sendRequest(
      GET_PRODUCTS_BY_CATEGORY + "/" + category
    );
    return products;
  };

  const getProductUserDashboardData = async (productId) => {
    const dashProductData = await sendRequest(
      GET_PRODUCT_DASHBOARD_DATA + "/" + productId
    );

    dispatch(
      addProductData({
        ...productData,
        sellerId: dashProductData.sellerId
      })
    );

    return dashProductData;
  };

  return {
    getProductsByCategory,
    getProductUserDashboardData,
    isLoading
  };
};

export default useProducts;
