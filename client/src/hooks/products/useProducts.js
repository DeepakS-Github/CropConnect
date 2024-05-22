import React from "react";
import useHttpClient from "../api/useHttpClient";
import {
  ADD_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_DASHBOARD_DATA,
  GET_SELLER_PRODUCTS,
  UPDATE_PRODUCT,
} from "../../constants/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { addProductData } from "../../redux/actions";

const useProducts = () => {
  const { sendRequest, sendAuthorizedRequest, isLoading } = useHttpClient();
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

  const getSellerProducts = async () => {
    try {
      let products = await sendAuthorizedRequest(
        "seller",
        GET_SELLER_PRODUCTS,
        "GET"
      );
      return products.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId, formData) => {
    try {
      await sendAuthorizedRequest(
        "seller",
        UPDATE_PRODUCT(productId),
        "PUT",
        formData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (formData) => {
    try {
      await sendAuthorizedRequest("seller", ADD_PRODUCT, "POST", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProductsByCategory,
    getProductUserDashboardData,
    getSellerProducts,
    updateProduct,
    addProduct,
    isLoading,
  };
};

export default useProducts;
