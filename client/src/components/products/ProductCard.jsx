import React from "react";
import { addProductData } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductCard({ data, addOverlay = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToDetailsPage = () => {
    dispatch(addProductData(data));
    navigate(`details/${data._id}`);
  };

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        if (addOverlay) return;
        goToDetailsPage();
      }}
    >
      <div className="relative h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        {addOverlay && <div className="absolute inset-0 bg-black opacity-70 rounded-lg z-50 flex justify-center items-center">
          <span className="text-white">
            Not Within Delivery Radius
          </span>

        </div>}

        <div className="relative z-10">
          <img
            className="lg:h-48 h-28 w-full object-cover object-center"
            src={data.image}
            alt="product"
          />
          <div className="px-3 md:px-6 pt-3 md:pt-6 pb-1 md:pb-4">
            <h1 className="title-font text-base md:text-lg font-medium text-gray-900 mb-1">
              {data.name}
            </h1>
            <h2 className="text-xs mb-1 md:mb-2 font-medium text-gray-400">
              BRAND: {data.brand}
            </h2>
            <p className="mb-1 text-sm md:text-base text-red-500 font-semibold">
              Rs.{data.pricePerUnit}/{data.measuringUnit}
            </p>
            <h2 className="text-xs title-font font-medium text-gray-400 mb-2">
              Minimum Order Quantity: {data.minimumOrderQuantity}
              {data.measuringUnit}
            </h2>
            {/* <p className="leading-relaxed mb-3 font-semibold text-red-500">
            <i className="fa-solid fa-location-dot text-red-500 mr-1"></i>
            {data.location.latitude}, {data.location.longitude}
          </p> */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProductCard;
