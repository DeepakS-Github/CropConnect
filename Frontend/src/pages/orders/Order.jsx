import React, { useRef } from "react";
import OrderCartCard from "../../components/OrderCartCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postAPI } from "../../utils/api/postRequest";
import { removeFromCart } from "../../redux/actions";
import { notify } from "../../utils/helper/notification";
import getCurrentDateTime from "../../utils/helper/getCurrentDateTime";
import LeafletMap from "../../components/LeafletMap";

function Order() {
  const dispatch = useDispatch();

  const deliveryCharge = 500;
  const limitForFreeDelivery = 1500;

  const cartData = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.userReducer);

  const [totalAmount, setTotalAmount] = useState(0);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [customerLatitude, setCustomerLatitude] = useState(null);
  const [customerLongitude, setCustomerLongitude] = useState(null);

  const orderNow = async () => {
    if (customerLatitude === null || customerLongitude === null) {
      notify("Please select valid delivery location", "info");
      return;
    }

    cartData.forEach(async (element) => {
      const orderData = {
        productId: element._id,
        image: element.image,
        name: element.name,
        measuringUnit: element.unit,
        orderQty: element.qty,
        orderLocation: {
          latitude: customerLatitude,
          longitude: customerLongitude,
        },
        customerPhoneNo: userData.phoneNo,
        customerName: userData.name,
        customerEmail: userData.email,
        totalPrice: element.pricePerUnit * element.qty,
        sellerId: element.sellerId,
      };

      console.log("Order data:", orderData);
      let isSuccessfull = await postAPI("order/add", orderData);

      if (isSuccessfull) {
        dispatch(removeFromCart(element._id));
      } else {
        notify("Something went wrong", "error");
      }
    });
  };

  useEffect(() => {
    let amount = 0;
    cartData.map((item) => {
      amount = amount + item.currentPrice;
    });
    setTotalAmount(amount);
  }, [cartData]);

  return (
    <>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Your Order
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            {getCurrentDateTime()}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Your Cart
              </p>

              {cartData.map((item, index) => (
                <OrderCartCard item={item} key={index} />
              ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      Rs.{totalAmount}.00
                    </p>
                  </div>
                  {/* <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      Rs.25.00 (5%)
                    </p>
                  </div> */}
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    {totalAmount >= 1500 ? (
                      <p className="text-base dark:text-green-300 leading-4 text-green-600">
                        FREE
                      </p>
                    ) : (
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        Rs.{deliveryCharge}.00
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    Rs.
                    {totalAmount +
                      (totalAmount >= limitForFreeDelivery
                        ? 0
                        : deliveryCharge)}
                    .00
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        CropConnect
                        <br />
                        <span className="font-normal">
                          Delivery within 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    Rs.
                    {totalAmount +
                      (totalAmount >= limitForFreeDelivery
                        ? 0
                        : deliveryCharge)}
                    .00
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                    onClick={() => {
                      if (cartData.length === 0) {
                        notify("First add some items to cart", "info");
                      } else {
                        orderNow();
                      }
                    }}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-[500px] flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-6 border-b border-gray-200">
                  <p className="text-base dark:text-white font-semibold leading-4 flex flex-row gap-4 text-left text-gray-800">
                    {userData.name}
                  </p>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 ">
                    {userData.email}
                  </p>
                </div>
              </div>
              {customerLatitude !== null && (
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex w-full justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Your Selected Location
                      </p>
                      <div>
                        <div>Latitude: {customerLatitude}</div>
                        <div>Longitude: {customerLongitude}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex w-full justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <div className="w-full z-10">
                      <LeafletMap
                        width={"w-full"}
                        height={"h-96"}
                        showSearchBox={true}
                        latitude={latitude}
                        longitude={longitude}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full my-2 justify-center items-center md:justify-start md:items-start">
                  <button
                    className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                    onClick={() => {
                      if (latitude === 0 && longitude === 0) {
                        notify("Please select valid delivery location", "info");
                        return;
                      }
                      setCustomerLatitude(latitude);
                      setCustomerLongitude(longitude);
                    }}
                  >
                    Submit Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
