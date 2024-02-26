import React from "react";
import { addProductData } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductCard({ data }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToDetailsPage = () => {
    dispatch(addProductData(data));
    navigate('details');
  }

  return (
    <div className="w-full cursor-pointer" onClick={()=>{goToDetailsPage()}}>
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          // src={"https://source.unsplash.com/random/?rice"}
          src={data.image}
          alt="product"
        />
        <div className="px-6 pt-6 pb-4">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
            {data.name}
          </h1>
          <h2 className="text-xs mb-2 title-font font-medium text-gray-400">
            BRAND: {data.brand}
          </h2>
          <p className="leading-relaxed mb-1 text-red-500 font-semibold">
            <i className="fa-solid fa-indian-rupee-sign text-red-500 mr-1"></i>
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
  );
}

export default ProductCard;
