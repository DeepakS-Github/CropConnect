import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/helper/notification";


axios.defaults.baseURL = import.meta.env.VITE_CROPCONNECT_API;

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {},
    showToast = true
  ) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers,
      });
      console.log("URL RESPONSE", url, " ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (showToast) notify(error.response.data.message, "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendRequest, setIsLoading };
};

export default useHttpClient;