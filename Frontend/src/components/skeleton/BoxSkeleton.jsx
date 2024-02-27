import React from "react";

function BoxSkeleton({ height=0, width="full", paddingX=12, paddingY=8}) {
  return (
    <div
      className={`bg-gray-300 rounded px-${paddingX} py-${paddingY} dark:bg-gray-700 h-${height} w-${width} animate-pulse`}
    ></div>
  );
}

export default BoxSkeleton;
