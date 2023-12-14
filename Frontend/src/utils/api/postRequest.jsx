import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const postAPI = async (endpointURL, data) => {
  try {
    const response = await fetch(`http://localhost:8080/${endpointURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if(responseData["userData"]){
      localStorage.setItem("userId", responseData["userId"]);
      return responseData["userData"];
    }
    if(responseData["sellerData"]){
      localStorage.setItem("sellerId", responseData["sellerData"]["_id"]);
      return responseData["sellerData"];
    }
    notify(responseData["message"], notifyType(response.status));
  } catch (error) {
    notify(error, "error");
  }
};

