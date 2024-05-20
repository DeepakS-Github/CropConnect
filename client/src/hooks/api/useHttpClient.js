import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/helper/notification";
import { notifyType } from "../../utils/helper/notificationType";

axios.defaults.baseURL = import.meta.env.VITE_CROPCONNECT_API;

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  return { isLoading, sendRequest, setIsLoading };
};

export default useHttpClient;
