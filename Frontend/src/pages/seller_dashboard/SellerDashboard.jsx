import React, { useState } from "react";
import SellerProducts from "./SellerProducts";
import SellerOrderRequests from "./SellerOrderRequests";
import SellerFAQs from "./SellerFAQs";
import Heading from "../../components/heading/Heading";

function SellerDashboard() {
  const [category, setCategory] = useState(1);

  return (
    <>
      {/* Banner Section */}

      <div>
        <section className="overflow-hidden">
          <div className="relative overflow-hidden bg-no-repeat bg-cover h-[300px] md:h-[500px] bg-[url('https://source.unsplash.com/random/?Farms,Fruits,Vegetables')] bg-center">
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black bg-opacity-75">
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white px-6 md:px-12">
                  <h1 className="text-3xl md:text-6xl xl:text-7xl font-bold tracking-tight">
                    The best offer on the market <br />
                    <span>for your business</span>
                  </h1>
                </div>
              </div>
            </div>

          </div>

         
        </section>
      </div>

      <Heading text={"Overview"}/>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-2 md:gap-24 w-11/12 mb-12 md:my-12 mx-auto">
        <span
          className={`${
            category === 1 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-base md:text-xl font-semibold rounded py-2 md:py-4 text-center`}
          onClick={() => setCategory(1)}
        >
          Your Products
        </span>
        <span
          className={`${
            category === 2 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-base md:text-xl font-semibold rounded py-2 md:py-4 text-center`}
          onClick={() => setCategory(2)}
        >
          Order Requests
        </span>
        <span
          className={`${
            category === 3 ? "bg-gray-200 shadow" : "bg-gray-100"
          } cursor-pointer text-base md:text-xl font-semibold rounded py-2 md:py-4 text-center`}
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
