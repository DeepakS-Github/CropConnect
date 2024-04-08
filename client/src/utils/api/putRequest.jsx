import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const putAPI = async (endpointURL, data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CROPCONNECT_API}${endpointURL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    notify(responseData["message"], notifyType(response.status));
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

