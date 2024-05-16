import React from "react";

const useCookie = () => {
  const getCookie = (tokenName) => {
    var name = tokenName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  };

  return { getCookie };
};

export default useCookie;
