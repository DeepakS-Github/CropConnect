import React from "react";

const SideImage = ({ type }) => {
  return (
    <div className="block relative w-full md:w-1/2 h-48 md:h-full">
      <div className="absolute inset-0 z-10 bg-black text-gray-200 bg-opacity-50 text-lg  md:text-xl lg:text-2xl font-semibold flex items-end justify-end">
        <p className="pl-6 pb-8 md:pb-16 pr-12">
          {type === "seller"
            ? "Unlock Opportunities, Harvest Success with CropConnect"
            : "Farm-Fresh Delights Await – Start Exploring Today!"}
        </p>
      </div>{" "}
      <div className="relative w-full z-0 h-full bg-blue-200 bg-[url('https://source.unsplash.com/P0xIIGRGaEQ')] bg-cover shadow"></div>
    </div>
  );
};

export default SideImage;
