import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAPI } from "../../utils/api/getRequest";
import { postAPI } from "../../utils/api/postRequest";
import { deleteAPI } from "../../utils/api/deleteRequest";
import SellerProductModal from "./SellerProductModal";
import Spinner from "../../components/Spinner";
import { notify } from "../../utils/helper/notification";

function SellerProducts() {
  const [dropBox, setDropBox] = useState(false);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [editBox, setEditBox] = useState(false);

  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const [indexOfProduct, setIndexOfProduct] = useState(-1);

  // API to DELETE Data
  const handleDelete = async (productId, index) => {
    if (!loading) {
      setIndexOfProduct(index);
      setLoading(true);
      await deleteAPI(`product/delete/${productId}`);
      setIsDataUpdated(true);
      setIndexOfProduct(-1);
      setLoading(false);
    } else {
      notify("Please wait", "info");
    }
  };

  // API to GET Data
  const getProducts = async () => {
    let productData = await getAPI(
      `product/getProductData/${localStorage.getItem("sellerId")}`
    );
    setData(productData);
  };

  useEffect(() => {
    setIsDataUpdated(false);
    getProducts();
  }, [isDataUpdated]);

  return (
    <>
      {/* Form Modal */}

      <SellerProductModal
        dropBox={dropBox}
        setDropBox={setDropBox}
        editBox={editBox}
        setEditBox={setEditBox}
        setIsDataUpdated={setIsDataUpdated}
        loading={loading}
        setLoading={setLoading}
      />

      {/* Table Header */}
      <h1 className="text-3xl font-medium mb-4 px-4">All Products</h1>
      <div className="w-full flex items-center justify-between px-4">
        <div className="mt-1 relative sm:w-64 xl:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products"
          />
        </div>
        <div
          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700"
          onClick={(e) => {
            e.preventDefault();
            setDropBox(1);
          }}
        >
          <i className="fa-regular fa-plus mr-2"></i>Add Product
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
                  Category
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-4">
                  Product Name
                </th>
                <th scope="col" className="px-6 whitespace-nowrap  py-4">
                  Shelf Life
                </th>
                <th scope="col" className="px-6 whitespace-nowrap  py-4">
                  Quantity Left
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Location
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Minimum Order Quantity
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Measuring Unit
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Price Per Unit
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4 whitespace-nowrap">
                  Operation
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
                    <img src={item.image} alt="Image" />
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.shelfLife}</td>
                  <td className="px-6 py-4">
                    {item.quantity} {item.measuringUnit}
                  </td>
                  <td className="px-6 py-4">
                    {item.location.latitude}, {item.location.longitude}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.minimumOrderQuantity} {item.measuringUnit}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.measuringUnit}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    Rs. {item.pricePerUnit}/{item.measuringUnit}
                  </td>
                  <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                    {item.description}
                  </td>
                  <td className=" px-6 py-4">
                    <span className=" flex justify-center items-center gap-2">
                      <div
                        className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700  whitespace-nowrap"
                        // onClick={()=>{handleEdit(item._id)}}
                        onClick={(e) => {
                          e.preventDefault();
                          setEditBox(1);
                          setDropBox(1);
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square mr-2"></i>
                        <span className="font-medium">Edit</span>
                      </div>

                      <div
                        className="text-md py-2 px-4 text-white rounded cursor-pointer bg-rose-700 whitespace-nowrap"
                        onClick={() => {
                          handleDelete(item._id, index);
                        }}
                      >
                        <span className="font-medium flex flex-row gap-1 justify-center items-center">
                          {indexOfProduct === index ? (
                            <Spinner width="w-5" color="#ffffff" />
                          ) : (
                            <i className="fa-regular fa-trash-can"></i>
                          )}
                          <span className="ml-1">Delete</span>
                        </span>
                      </div>
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

export default SellerProducts;
