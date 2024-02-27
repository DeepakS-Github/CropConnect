import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const FAQSellerSkeleton = ({ noOfBoxes = 10 }) => {
  return (
    <>
    <div className="px-4 mx-auto grid grid-cols-2 gap-4 my-4">
      {Array(noOfBoxes)
        .fill(0)
        .map((box, index) => (
          <BoxSkeleton key={index} height={0} width={"full"} paddingX={12} paddingY={8}/>
        ))}
    </div>
    </>
  );
};

export default FAQSellerSkeleton;
