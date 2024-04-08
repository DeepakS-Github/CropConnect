import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const ProductSkeleton = ({ noOfBoxes = 8 }) => {
  return (
    <div className="grid gap-4 md:gap-8 my-6 md:my-12 grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
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
    </div>
  );
};

export default ProductSkeleton;
