import React from "react";
import BoxSkeleton from "./BoxSkeleton";

const GraphSkeleton = ({ noOfBoxes = 4 }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {Array(noOfBoxes)
          .fill(0)
          .map((box, index) => (
            <BoxSkeleton
              key={index}
              width={"w-full"}
              radius={"rounded"}
              height={"h-[320px]"}
            />
          ))}
      </div>
    </>
  );
};

export default GraphSkeleton;
