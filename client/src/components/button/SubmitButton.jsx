import React from "react";
import Spinner from "../loading/Spinner";

const SubmitButton = ({ bgColor, hoverBgColor, text, isLoading }) => {
  return (
    <button
      type="submit"
      className={`w-full flex justify-center items-center text-white ${bgColor} hover:${hoverBgColor} font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
    >
      {isLoading && <Spinner width="w-5" color="#ffffff" />}
      {text}
    </button>
  );
};

export default SubmitButton;
