import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GET_SELLER_ORDERS, ORDER_PRODUCT } from "../../constants/apiEndpoints";
import { removeFromCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

const useOrder = () => {
  const dispatch = useDispatch();

  const { sendAuthorizedRequest, isLoading } = useHttpClient();

  const orderProduct = async (orderData) => {
    try {
      let res = await sendAuthorizedRequest(
        "user",
        ORDER_PRODUCT,
        "POST",
        orderData
      );

      if (res !== false) {
        for (const item of orderData) {
          dispatch(removeFromCart(item.productId));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSellerOrders = async () => {
    try {
      const res = await sendAuthorizedRequest(
        "seller",
        GET_SELLER_ORDERS,
        "GET"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { orderProduct, getSellerOrders, isLoading };
};

export default useOrder;
