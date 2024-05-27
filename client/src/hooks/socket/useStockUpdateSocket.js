import React, { useEffect } from "react";
import io from "socket.io-client";

const useStockUpdateSocket = (setProductDashboardData) => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_CROPCONNECT_API, {
      transports: ["websocket"],
    });

    socket.on("stockUpdate", (stockLeft) => {
      setProductDashboardData((prevData) => {
        return {
          ...prevData,
          quantity: stockLeft,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useStockUpdateSocket;
