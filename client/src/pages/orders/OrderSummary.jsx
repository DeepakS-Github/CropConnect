import React from "react";

const OrderSummary = ({ totalAmount, deliveryCharge, limitForFreeDelivery }) => {

  return (
    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
      <h3 className="text-xl  font-semibold leading-5 text-gray-800">
        Summary
      </h3>
      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
        <div className="flex justify-between w-full">
          <p className="text-base  leading-4 text-gray-800">Subtotal</p>
          <p className="text-base  leading-4 text-gray-600">
            Rs.{totalAmount}.00
          </p>
        </div>
        {/* <div className="flex justify-between items-center w-full">
        <p className="text-base  leading-4 text-gray-800">
          Discount{" "}
        </p>
        <p className="text-base  leading-4 text-gray-600">
          Rs.25.00 (5%)
        </p>
      </div> */}
        <div className="flex justify-between items-center w-full">
          <p className="text-base  leading-4 text-gray-800">Shipping</p>
          {totalAmount >= limitForFreeDelivery ? (
            <p className="text-base  leading-4 text-green-600">FREE</p>
          ) : (
            <p className="text-base  leading-4 text-gray-600">
              Rs.{deliveryCharge}.00
            </p>
          )}
        </div>
        <div className="text-xs w-full text-right font-semibold text-green-600">
          *Order above Rs.{limitForFreeDelivery}.00 for free delivery
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-base  font-semibold leading-4 text-gray-800">
          Total
        </p>
        <p className="text-base  font-semibold leading-4 text-gray-600">
          Rs.
          {totalAmount +
            (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge)}
          .00
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
