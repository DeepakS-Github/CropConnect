import React from "react";

function BoxSkeleton({ height, width, paddingX, paddingY, radius}) {
  return (
    <div
      className={`bg-gray-300 ${radius} ${paddingX} ${paddingY} dark:bg-gray-700 ${height} ${width} animate-pulse`}
    ></div>
  );
}

export default BoxSkeleton;
