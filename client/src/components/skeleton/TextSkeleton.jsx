import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const TextSkeleton = ({
  noOfRows = 6,
  fontSizeHeightMd = "h-[16px]",
  fontSizeHeight = "h-[14px]",
  width = "w-full",
}) => {
  return (
    <div className={`grid  gap-1.5 ${width}`}>
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
