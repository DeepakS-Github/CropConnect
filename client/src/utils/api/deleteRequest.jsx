import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const deleteAPI = async (endpointURL) => {
    // console.log("entered");


  try {
    const response = await fetch(`${import.meta.env.VITE_CROPCONNECT_API}${endpointURL}`, {
      method: "DELETE"
    });
    const responseData = await response.json();
    if (!response.ok) {
        // If the response status is not OK (e.g., 404 or 500), throw an error
        notify(responseData["message"], notifyType(response.status));
        throw new Error(`Request failed with status: ${response.status}`);
    }
    // console.log(responseData);
    notify(responseData["message"], notifyType(response.status));
  } catch (error) {
      notify(responseData["message"], "error");
    console.log(error);

  }
};

