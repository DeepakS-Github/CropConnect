import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";
import { useDispatch } from "react-redux";
import { editProductDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useProducts from "../../hooks/products/useProducts";


function SellerProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { getSellerProducts, deleteProduct } = useProducts();

  const [isDeleting, setIsDeleting] = useState(false);

  const [data, setData] = useState([]);

  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const [indexOfProduct, setIndexOfProduct] = useState(-1);

  // API to DELETE Data
  const handleDelete = async (productId, index) => {
    if (!isDeleting) {
      setIndexOfProduct(index);
      setIsDeleting(true);
      await deleteProduct(productId);
      setIsDataUpdated(true);
      setIndexOfProduct(-1);
      setIsDeleting(false);
    } else {
      notify("Please wait", "info");
    }
  };

  // API to GET Data
  const getProducts = async () => {
    let productData = await getSellerProducts();
    setData(productData);
    setIsDataFetching(false);
  };

  useEffect(() => {
    setIsDataUpdated(false);
    getProducts();
  }, [isDataUpdated]);

  return (
    <>
      {/* Table Header */}
      <Heading text={"Your Products"} textAlign="text-left" />
      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="mt-1 relative w-full  md:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products (Coming soon)"
          />
        </div>
        <Link to="product/add" className="w-full md:w-fit text-center">
          <div className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700">
            <i className="fa-regular fa-plus mr-2"></i>Add Product
          </div>
        </Link>
      </div>
      {/* Table */}
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStateText text="Your seller dashboard currently does not display any products. To start selling, kindly add your products by navigating to the 'Add Product' section." />
          ) : (
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
                    Delivery Radius
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
                      <img src={item.image} alt="Image" loading="lazy"/>
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.shelfLife}</td>
                    <td className="px-6 py-4">
                      {item.quantity} {item.measuringUnit}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer font-medium text-sky-700 hover:underline whitespace-nowrap"
                      onClick={() => {
                        navigate(
                          `/map/${item.location.coordinates[1]}/${item.location.coordinates[0]}`
                        );
                      }}
                    >
                      {item.location.coordinates[1].toFixed(4)},{" "}
                      {item.location.coordinates[0].toFixed(4)}
                    </td>
                    <td className=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
                      {item.deliveryRadius} km
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
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(editProductDetails(item));
                            navigate(`product/edit`);
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
          )}
        </div>
      </div>
    </>
  );
}

export default SellerProducts;
