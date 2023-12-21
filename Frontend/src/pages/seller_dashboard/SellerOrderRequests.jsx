import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAPI } from "../../utils/api/getRequest";
import { GoDotFill } from "react-icons/go";

function SellerOrderRequests() {
  const [data, setData] = useState([]);

  // API to GET Data
  const getOrders = async () => {
    let orderedData = await getAPI(
      `order/get/${localStorage.getItem("sellerId")}`
    );
    setData(orderedData);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {/* Table Header */}
      <h1 className="text-3xl font-medium mb-4 px-4">All Orders</h1>
      <div className="w-full flex items-center px-4">
        <div className="mt-1 relative sm:w-64 xl:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for orders"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          <table className="text-center text-sm font-light w-full">
            <thead className="border-b font-medium bg-gray-100">
              <tr>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  #
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Image
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Product Name
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Order Date
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Customer Name
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Customer PhoneNo
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Customer Email
                </th>
                <th scope="col" className="px-6 whitespace-nowrap  py-4">
                  Order Quantity
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Order Location
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 text-center"
                  key={index}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-2">
                    <img src={item.image} className="w-24 h-24" alt="Image" />
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.customerName}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.customerPhoneNo}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.customerEmail}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.orderQty} {item.measuringUnit}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.orderLocation}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    Rs.{item.totalPrice}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal text-yellow-500 font-medium">
                    <span className="flex justify-center items-center"><GoDotFill className="mr-1" />
                    Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SellerOrderRequests;