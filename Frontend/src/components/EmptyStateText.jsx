import React from "react";

const EmptyStateText = ({ text = "No Data Available", marginTop=0 }) => {
  return <div className={`text-base w-11/12 mx-auto font-semibold text-center ${marginTop}`}>{text}</div>;
};

export default EmptyStateText;
