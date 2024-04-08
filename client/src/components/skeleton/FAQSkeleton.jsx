import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const FAQSkeleton = ({ noOfBoxes = 6 }) => {
  return (
    <>
      <div className="grid lg:grid-cols-3  gap-4 md:gap-x-6 md:gap-y-12">
        {Array(noOfBoxes)
          .fill(0)
          .map((box, index) => (
            <BoxSkeleton
              key={index}
              width={"w-full"}
              radius={"rounded"}
              height={"h-[50px] md:h-[150px]"}
            />
          ))}
      </div>
    </>
  );
};

export default FAQSkeleton;
