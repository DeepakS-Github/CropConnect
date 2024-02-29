import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const getAPI = async (endpointURL) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CROPCONNECT_API}${endpointURL}`, {
      method: "GET"
    });
    const responseData = await response.json();
    if (!response.ok) {
      // If the response status is not OK (e.g., 404 or 500), throw an error
      notify(responseData["message"], notifyType(response.status));
      throw new Error(`Request failed with status: ${response.status}`);
  }
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

