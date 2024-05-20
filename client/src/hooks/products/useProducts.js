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
    try {
      const products = await sendRequest(GET_PRODUCTS_BY_CATEGORY(category));
      return products.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductUserDashboardData = async (productId) => {
    try {
      const dashProductData = await sendRequest(
        GET_PRODUCT_DASHBOARD_DATA(productId)
      );

      dispatch(
        addProductData({
          ...productData,
          sellerId: dashProductData.data.sellerId,
        })
      );

      return dashProductData.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProductsByCategory,
    getProductUserDashboardData,
    isLoading,
  };
};

export default useProducts;
