import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const ProductSkeleton = ({ noOfBoxes = 8 }) => {
  return (
    <>
      {Array(noOfBoxes)
        .fill(0)
        .map((box, index) => (
          <BoxSkeleton
            key={index}
            height={"h-[200px] md:h-[320px]"}
            width={"w-full"}
            radius={"rounded-lg"}
          />
        ))}
    </>
  );
};

export default ProductSkeleton;
