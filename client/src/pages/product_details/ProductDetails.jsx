import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PiSmileySadLight } from "react-icons/pi";
import { IoBagRemoveOutline } from "react-icons/io5";
import { addToCart, removeFromCart } from "../../redux/actions";
import Heading from "../../components/heading/Heading";
import useProducts from "../../hooks/products/useProducts";
import useStockUpdateSocket from "../../hooks/socket/useStockUpdateSocket";
import TextSkeleton from "../../components/skeleton/TextSkeleton";
import { CiNoWaitingSign } from "react-icons/ci";
import { useParams } from "react-router-dom";
import BoxSkeleton from "../../components/skeleton/BoxSkeleton";
import ShareButton from "../../components/button/ShareButton";

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productData = useSelector((state) => state.productReducer);
  const cartData = useSelector((state) => state.cartReducer);

  const { getProductUserDashboardData, getMainProductData, isLoading } =
    useProducts();

  const [isMainDataLoading, setIsMainDataLoading] = useState(false);
  const [productDashboardData, setProductDashboardData] = useState(productData);
  useStockUpdateSocket(setProductDashboardData);

  useEffect(() => {
    setProductDashboardData(productData);
  }, [productData]);

  const isProductInCart = cartData.some(
    (item) => item._id === productDashboardData?._id
  );

  const fetchProductDashboardData = async () => {
    let data = await getProductUserDashboardData(productData?._id || productId);
    console.log(data);
    setProductDashboardData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  const fetchAllData = async () => {
    if (!productData) {
      setIsMainDataLoading(true);
      await getMainProductData(productId);
      setIsMainDataLoading(false);
    }

    await fetchProductDashboardData();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addProductToCart = () => {
    let cartProductData = {
      _id: productDashboardData._id,
      sellerId: productDashboardData.sellerId,
      image: productDashboardData.image,
      name: productDashboardData.name,
      category: productDashboardData.category,
      qty: productDashboardData.minimumOrderQuantity,
      brand: productDashboardData.brand,
      minQty: productDashboardData.minimumOrderQuantity,
      stocksLeft: productDashboardData.quantity,
      pricePerUnit: productDashboardData.pricePerUnit,
      unit: productDashboardData.measuringUnit,
      currentPrice:
        productDashboardData.pricePerUnit *
        productDashboardData.minimumOrderQuantity,
    };
    dispatch(addToCart(cartProductData));
  };

  const removeProductFromCart = () => {
    dispatch(removeFromCart(productDashboardData?._id));
  };

  return (
    <>
      <div className="lg:w-11/12 mx-auto flex flex-wrap">
        {isMainDataLoading ? (
          <BoxSkeleton height={"lg:h-auto h-64 "} width={"lg:w-1/2 w-full"} />
        ) : (
          <div className="lg:w-1/2 w-full lg:h-auto h-64 rounded relative">
            <img
              className="object-cover object-center"
              src={productDashboardData?.image}
            />
            <span className="absolute top-0 right-0 m-2">
              <ShareButton url={window.location.href}/>
            </span>
          </div>
        )}

        <div className="lg:w-1/2 w-full px-4 space-y-1 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">
            {isMainDataLoading ? (
              <TextSkeleton noOfRows={1} width="w-[80px]" />
            ) : (
              productDashboardData?.brand
            )}
          </h2>
          {isMainDataLoading ? (
            <TextSkeleton noOfRows={1} width="w-[100px]" />
          ) : (
            <Heading
              text={productDashboardData?.name}
              marginY="mb-2"
              textAlign="left"
              paddingX="p-0"
            />
          )}

          <p className="leading-relaxed text-sm md:text-base">
            {isLoading ? (
              <TextSkeleton noOfRows={12} />
            ) : (
              productDashboardData?.description
            )}
          </p>

          <div className="relative overflow-x-auto my-6">
            <table className="w-full text-base text-left text-gray-500">
              <tbody>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Stocks Left
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4 ">
                    {isLoading ? (
                      <TextSkeleton noOfRows={1} />
                    ) : (
                      `${productDashboardData?.quantity} ${productDashboardData?.measuringUnit}`
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Shelf Life
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4 ">
                    {isLoading ? (
                      <TextSkeleton noOfRows={1} />
                    ) : (
                      productDashboardData?.shelfLife
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between flex-col md:flex-row">
            <div className="space-y-1">
              {isMainDataLoading ? (
                <TextSkeleton noOfRows={1} />
              ) : (
                <div className="text-green-600 font-medium text-sm md:text-base">
                  Minimum Order Quantity:{" "}
                  {productDashboardData?.minimumOrderQuantity}{" "}
                  {productDashboardData?.measuringUnit}
                </div>
              )}
              {isMainDataLoading ? (
                <TextSkeleton
                  noOfRows={1}
                  fontSizeHeight="h-[24px]"
                  fontSizeHeightMd="h-[36px]"
                />
              ) : (
                <div className="flex justify-between">
                  <h2 className="text-2xl md:text-4xl text-left mb-1 font-medium">
                    Rs. {productDashboardData?.pricePerUnit}/
                    {productDashboardData?.measuringUnit}
                  </h2>
                </div>
              )}
            </div>

            {productDashboardData?.minimumOrderQuantity <=
            productDashboardData?.quantity ? (
              <button
                className={`flex mb-2 md:mb-4 mt-4 md:mt-2  text-white ${
                  isProductInCart
                    ? "bg-amber-500 hover:bg-amber-600"
                    : " bg-[#e11d48] hover:bg-[#e5345a]"
                } border-0 py-4 px-12 focus:outline-none rounded`}
                onClick={(e) => {
                  e.preventDefault();
                  if (isProductInCart) {
                    removeProductFromCart();
                  } else {
                    addProductToCart();
                  }
                }}
              >
                {isProductInCart ? (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <IoBagRemoveOutline className="mr-2 text-2xl" />
                    Remove From Cart
                  </span>
                ) : (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <i className="fa-solid fa-bag-shopping text-xl mr-2"></i>
                    Add To Cart
                  </span>
                )}
              </button>
            ) : (
              <button className="flex mb-4 mt-1  text-white bg-orange-600 border-0 py-4 px-12 focus:outline-none rounded">
                {" "}
                {isLoading ? (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <CiNoWaitingSign className=" text-3xl mr-2" />
                    Please Wait
                  </span>
                ) : (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <PiSmileySadLight className=" text-3xl mr-2" />
                    Out of Stock
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
