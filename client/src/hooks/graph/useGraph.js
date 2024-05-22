import React from "react";
import useHttpClient from "../api/useHttpClient";
import { GRAPH } from "../../constants/apiEndpoints";

const useGraph = () => {
  const { sendAuthorizedRequest, isLoading } = useHttpClient();

  const visualizeSalesData = async () => {
    try {
      let res = await sendAuthorizedRequest("seller", GRAPH, "GET");
      console.log("res", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { visualizeSalesData, isLoading };
};

export default useGraph;
