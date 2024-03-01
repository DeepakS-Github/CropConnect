import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../../pages/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { addSellerData, addUserData } from "../../redux/actions";
import { FaUserCircle } from "react-icons/fa";
import { SiSellfy } from "react-icons/si";
import { notify } from "../../utils/helper/notification";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDropdownRef = useRef();
  const sellerDropdownRef = useRef();

  const [openCart, setOpenCart] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const sellerData = useSelector((state) => state.sellerReducer);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSellerDropdown, setShowSellerDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(0);
      }

      if (
        sellerDropdownRef.current &&
        !sellerDropdownRef.current.contains(event.target)
      ) {
        setShowSellerDropdown(0);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 shadow">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-12 py-2 md:py-4">
        <a href="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-medium whitespace-nowrap">
            <span className="text-red-500 font-bold">C</span>rop
            <span className="text-red-500 font-bold">C</span>onnect
          </span>
        </a>
        <div className="flex flex-row gap-4 md:gap-8 text-2xl md:text-3xl">
          <div
            ref={userDropdownRef}
            className="relative flex flex-row gap-1 justify-center items-center text-blue-700 cursor-pointer"
            onMouseEnter={() => {
              setShowUserDropdown(true);
              setShowSellerDropdown(false);
            }}
            onClick={() => {
              if (!userData) {
                navigate("/account/user");
              }
            }}
          >
            <FaUserCircle />
            <span className="text-sm font-medium hidden md:block">User</span>
            {userData && (
              <div
                className={`absolute ${
                  showUserDropdown ? "block" : "hidden"
                } top-8 right-0 z-10 font-medium bg-white rounded-lg shadow-md pl-1 md:pl-4 pr-2 md:pr-8 py-0 md:py-2`}
              >
                <ul className="py-1 md:py-2 flex flex-col text-sm gap-2 text-gray-700 ">
                  <li
                    onClick={() => {
                      dispatch(addUserData(null));
                      notify("User Logged Out", "info");
                      navigate("/");
                    }}
                  >
                    <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  whitespace-nowrap">
                      User Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            ref={sellerDropdownRef}
            className="relative flex flex-row gap-1 justify-center items-center text-green-700 cursor-pointer"
            onMouseEnter={() => {
              setShowSellerDropdown(true);
              setShowUserDropdown(false);
            }}
            onClick={() => {
              if (!sellerData) {
                navigate("/account/seller");
              }
            }}
          >
            <SiSellfy />
            <span className="text-sm font-medium hidden md:block">Seller</span>
            {sellerData && (
              <div
                className={`absolute ${
                  showSellerDropdown ? "block" : "hidden"
                } top-8 right-0 z-10 font-medium bg-white rounded-lg shadow-md pl-1 md:pl-4 pr-2 md:pr-8 py-0 md:py-2`}
              >
                <ul className="py-2 flex flex-col text-sm gap-2 text-gray-700 ">
                  <li
                    onClick={() => {
                      navigate("/sellerdashboard");
                    }}
                  >
                    <a className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0  whitespace-nowrap">
                      Seller Dashboard
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      dispatch(addSellerData(null));
                      navigate("/");
                      notify("Seller Logged Out", "info");
                    }}
                  >
                    <a className="block px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0  whitespace-nowrap">
                      Seller Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className="flex flex-row gap-1 justify-center items-center text-red-700 cursor-pointer"
            onClick={() => {
              setOpenCart(true);
            }}
          >
            <AiOutlineShoppingCart />
            <span className="text-sm font-medium hidden md:block">Cart</span>
          </div>
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
