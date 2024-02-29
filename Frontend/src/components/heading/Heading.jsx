import React from "react";

const Heading = ({
  text,
  marginY = "my-6 md:my-8",
  textAlign = "text-center",
  paddingX = "px-4",
}) => {
  return (
    <h1
      class={`leading-none ${textAlign} tracking-tight text-gray-900 text-xl md:text-2xl lg:text-3xl font-medium ${marginY} ${paddingX}`}
    >
      {text}
    </h1>
  );
};

export default Heading;
