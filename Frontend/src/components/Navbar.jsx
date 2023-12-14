import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../pages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addSellerData, addUserData } from "./../redux/actions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [openCart, setOpenCart] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const sellerData = useSelector((state) => state.sellerReducer);

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            CropConnect
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white space-x-2">
            {!userData && (
              <li>
                <Link
                  to={"/account/user"}
                  className="block py-2 px-4 bg-green-700 text-white rounded-full hover:bg-green-600"
                >
                  User Login
                </Link>
              </li>
            )}
            {userData && (
              <li>
                <div
                  className="block py-2 cursor-pointer px-4 bg-green-700 text-white rounded-full hover:bg-green-600"
                  onClick={() => {
                    dispatch(addUserData(null));
                    navigate("/");
                  }}
                >
                  User Logout
                </div>
              </li>
            )}
            <li>
              <Link
                to={sellerData ? "/sellerdashboard" : "/account/seller"}
                className="block py-2 px-4 bg-blue-700 text-white rounded-full hover:bg-blue-600"
              >
                {sellerData ? "Go to Seller Dashboard" : "Become a seller"}
              </Link>
            </li>
            {sellerData && (
              <li>
                <div
                  className="block py-2 px-4 cursor-pointer bg-blue-700 text-white rounded-full hover:bg-blue-600"
                  onClick={() => {
                    dispatch(addSellerData(null));
                    navigate("/");
                  }}
                >
                  Seller Logout
                </div>
              </li>
            )}
            <li>
              <Link
                className="flex justify-center items-center h-full gap-2 py-0 px-5 bg-rose-600 text-white rounded-full hover:bg-rose-700"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenCart(true);
                }}
              >
                <AiOutlineShoppingCart className="text-2xl" /> <span>Cart</span>
              </Link>
            </li>
            {openCart && <Cart setOpenCart={setOpenCart} />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
