import React from "react";
import useHttpClient from "../api/useHttpClient";
import { ORDER_PRODUCT } from "../../constants/apiEndpoints";
import { removeFromCart } from "../../redux/actions";
import { useDispatch } from "react-redux";

const useOrder = () => {
  const dispatch = useDispatch();

  const { sendAuthorizedRequest, isLoading } = useHttpClient();

  const orderProduct = async (orderData) => {
    try {
      await sendAuthorizedRequest("user", ORDER_PRODUCT, "POST", orderData);

      for (const item of orderData) {
        dispatch(removeFromCart(item.productId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { orderProduct, isLoading };
};

export default useOrder;
