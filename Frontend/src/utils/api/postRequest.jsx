import { notify } from "../helper/notification";
import { notifyType } from "../helper/notificationType";

export const postAPI = async (endpointURL, data, showToast=true) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CROPCONNECT_API}${endpointURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // console.log(responseData);
    if(showToast){
      notify(responseData["message"], notifyType(response.status));
    }
    return responseData;
  } catch (error) {
    notify(error, "error");
    // return false;
  }
};

