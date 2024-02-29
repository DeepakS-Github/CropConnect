import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { PiSmileySadLight } from "react-icons/pi";
import { IoBagRemoveOutline } from "react-icons/io5";
import { addToCart, removeFromCart } from "../../redux/actions";
import { store } from "../../redux/store";
import Heading from "../../components/heading/Heading";

function ProductDetails() {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.productReducer);
  // console.log(productData);

  const cartData = useSelector((state) => state.cartReducer);
  const isProductInCart = cartData.some(item => item._id === productData._id);


  const addProductToCart = () => {
    let cartProductData = {
      _id: productData._id,
      sellerId: productData.sellerId,
      image: productData.image,
      name: productData.name,
      qty: productData.minimumOrderQuantity,
      brand: productData.brand,
      minQty: productData.minimumOrderQuantity,
      stocksLeft: productData.quantity,
      pricePerUnit: productData.pricePerUnit,
      unit: productData.measuringUnit,
      currentPrice: productData.pricePerUnit*productData.minimumOrderQuantity
    }
    console.log(store.getState());
    dispatch(addToCart(cartProductData));
    console.log(store.getState());
    // setIsProductInCart(true);
  };

  const removeProductFromCart = () => {
    console.log(store.getState());
    dispatch(removeFromCart(productData._id));
    console.log(store.getState());
    // setIsProductInCart(false);
  }

  
  return (
    <>
      <div className="lg:w-11/12 mx-auto flex flex-wrap">
        <img
          className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          // src={`https://source.unsplash.com/random/400x400?rice`}
          src = {productData.image}
        />
        <div className="lg:w-1/2 w-full px-4 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">
            {productData.brand}
          </h2>
          <Heading text={productData.name} marginY="mb-2" textAlign="left" paddingX="p-0"/>
          <p className="leading-relaxed text-sm md:text-base">
            {productData.description} It is a long established fact that a
            reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has
            a more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose (injected humour and the like).
          </p>

          <div className="relative overflow-x-auto my-6">
            <table className="w-full text-base text-left text-gray-500">
              <tbody>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Stocks Left
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4 ">
                    {productData.quantity} {productData.measuringUnit}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Shelf Life
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4 ">{productData.shelfLife}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between flex-col md:flex-row">
            <div>
              <div className="text-green-600 font-medium text-sm md:text-base">
                Minimum Order Quantity: {productData.minimumOrderQuantity}{" "}
                {productData.measuringUnit}
              </div>
              <div className="flex justify-between">
                <h2 className="text-2xl md:text-4xl text-left mb-1 font-medium">
                  Rs. {productData.pricePerUnit}/{productData.measuringUnit}
                </h2>
              </div>
            </div>

            {productData.minimumOrderQuantity <= productData.quantity ? (
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
                <span className="flex items-center text-lg h-full w-full justify-center">
                  <PiSmileySadLight className=" text-3xl mr-2" />
                  Out of Stock
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
