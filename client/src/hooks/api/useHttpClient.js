import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/helper/notification";
import { notifyType } from "../../utils/helper/notificationType";
import { useCookies } from "react-cookie";

axios.defaults.baseURL = import.meta.env.VITE_CROPCONNECT_API;

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["user_access_token", "seller_access_token"]);

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {},
    showToast = true,
    withCredentials = false
  ) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers,
        withCredentials,
      });
      console.log("URL RESPONSE", url, " ", response);
      if (showToast) notify(response.data.message, "success");
      return response;
    } catch (error) {
      console.log(error);
      if (showToast)
        notify(error.response.data.message, notifyType(error.response.status));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendAuthorizedRequest = async (
    requestType = "user",
    url,
    method = "GET",
    body = null,
    headers = {},
    showToast = true,
    withCredentials = false
  ) => {
    if (requestType === "user" && !cookies.user_access_token) {
      notify("Please login as user to continue", "info");
      return;
    }

    if (requestType === "seller" && !cookies.seller_access_token) {
      notify("Please login as seller to continue", "info");
      return;
    }

    await sendRequest(
      url,
      method,
      body,
      {
        authorization: `Bearer ${
          requestType === "user"
            ? cookies.user_access_token
            : cookies.seller_access_token
        }`,
        ...headers,
      },
      showToast,
      withCredentials
    );
  };

  return { isLoading, sendRequest, sendAuthorizedRequest, setIsLoading };
};

export default useHttpClient;
