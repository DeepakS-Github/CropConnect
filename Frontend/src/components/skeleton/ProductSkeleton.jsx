import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const ProductSkeleton = ({ noOfBoxes = 8 }) => {
  return (
    <div className="grid gap-8 my-12 lg:grid-cols-4 w-11/12 mx-auto">
      {Array(noOfBoxes)
        .fill(0)
        .map((box, index) => (
          <BoxSkeleton
            key={index}
            height={"h-[320px]"}
            width={"w-full"}
            radius={"rounded-lg"}
          />
        ))}
    </div>
  );
};

export default ProductSkeleton;
