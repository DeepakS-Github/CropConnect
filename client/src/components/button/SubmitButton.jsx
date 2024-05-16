import React from "react";

const SubmitButton = ({bgColor, hoverBgColor, text}) => {
  return (
    <button
      type="submit"
      className={`w-full text-white ${bgColor} hover:${hoverBgColor} font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
