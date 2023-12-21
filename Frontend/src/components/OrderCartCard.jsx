import React from "react";

function OrderCartCard({item}) {
  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
      <div className="pb-4 md:pb-8 w-full md:w-40 md:h-40">
        <img
          className="w-full h-full object-fill hidden md:block"
          src={item.image}
          alt="product"
        />
        <img className="w-full md:hidden object-fill" src={item.image} alt="product" />
      </div>
      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
        <div className="w-full flex flex-col justify-start items-start space-y-8">
          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
            {item.name}
          </h3>
          <div className="flex justify-start items-start flex-col space-y-2">
            <p className="text-sm dark:text-white leading-none text-gray-800">
              <span className="dark:text-gray-400 text-gray-300">Brand: </span>{" "}
              {item.brand}
            </p>
            <p className="text-sm dark:text-white leading-none text-gray-800">
              <span className="dark:text-gray-400 text-gray-300">
                Minimum Order Quantity:{" "}
              </span>{" "}
              {item.minQty}{item.unit}
            </p>
            <p className="text-sm dark:text-white leading-none text-gray-800">
              <span className="dark:text-gray-400 text-gray-300">
                Current Stock:{" "}
              </span>{" "}
              {item.stocksLeft}{item.unit}
            </p>
          </div>
        </div>
        <div className="flex justify-between space-x-8 items-start w-full">
          <p className="text-base dark:text-white xl:text-lg leading-6">
            Rs.{item.pricePerUnit}/{item.unit}
          </p>
          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
            {item.qty}{item.unit}
          </p>
          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
            Rs.{item.currentPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderCartCard;