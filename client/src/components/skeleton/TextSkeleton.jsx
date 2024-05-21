import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const TextSkeleton = ({
  noOfRows = 6,
  fontSizeHeightMd = "h-[16px]",
  fontSizeHeight = "h-[14px]",
}) => {
  return (
    <div className="grid  gap-1.5">
      {Array(noOfRows)
        .fill(0)
        .map((_, index) => (
          <BoxSkeleton
            key={index}
            width={"w-full"}
            radius={"rounded"}
            height={`${fontSizeHeightMd} md:${fontSizeHeight}`}
          />
        ))}
    </div>
  );
};

export default TextSkeleton;
