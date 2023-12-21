import React, { useState } from "react";
import SellerProducts from "./SellerProducts";
import SellerOrderRequests from "./SellerOrderRequests";
import SellerFAQs from "./SellerFAQs";

function SellerDashboard() {
  const [category, setCategory] = useState(1);

  return (
    <>
      {/* Banner Section */}

      <div>
        <section className="overflow-hidden">
          <div className="relative overflow-hidden bg-no-repeat bg-cover h-[500px] bg-[url('https://source.unsplash.com/random/?Farms,Fruits,Vegetables')] bg-center">
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black bg-opacity-75">
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white px-6 md:px-12">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                    The best offer on the market <br />
                    <span>for your business</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="-mt-2.5 md:-mt-4 lg:-mt-6  h-[50px] scale-[2] origin-center text-white">
            <svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </section>
      </div>

      <div className=" mt-12 font-medium text-4xl w-full text-center tracking-wider">
        OVERVIEW
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-24 w-11/12 my-12 mx-auto">
        <span
          className={`${
            category === 1 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-xl font-semibold rounded py-4 text-center`}
          onClick={() => setCategory(1)}
        >
          Your Products
        </span>
        <span
          className={`${
            category === 2 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-xl font-semibold rounded py-4 text-center`}
          onClick={() => setCategory(2)}
        >
          Order Requests
        </span>
        <span
          className={`${
            category === 3 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-xl font-semibold rounded py-4 text-center`}
          onClick={() => setCategory(3)}
        >
          Your FAQs
        </span>
      </div>

      {category === 1 && <SellerProducts />}
      {category === 2 && <SellerOrderRequests />}
      {category === 3 && <SellerFAQs/>}
    </>
  );
}

export default SellerDashboard;
