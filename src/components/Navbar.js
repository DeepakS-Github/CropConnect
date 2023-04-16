import React from "react";
import { useState } from "react";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import UserLogin from "./UserLogin";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(0);
  const [showCart, setShowCart] = useState(0);





  const [dropBox, setDropBox] = useState(0);

  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [title, setTitle] = useState();
  const [currentprice, setCurrentPrice] = useState();
  const [originalprice, setOriginalprice] = useState();
  const [location, setLocation] = useState();
  const [about, setAbout] = useState();

  const [data, setData] = useState([]);

  const [editBox, setEditBox] = useState();
  const [EditID, setEditID] = useState();


  let checkuserlogin = 123;



  return (
    <>
      <nav class="bg-white  border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-20 fixed top-0 left-0 right-0 drop-shadow">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <a href="#" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CropConnect
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  class="flex items-center justify-between relative w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={()=>{(showDropdown)?setShowDropdown(0):setShowDropdown(1)}}
                >
                  Tools
                  <svg
                    class="w-5 h-5 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div
                  class={`z-10 absolute top-12 left-0 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${(showDropdown)?"":"hidden"}`}
                >
                  <ul
                    class="py-2 text-md text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                        <Link to="/croppredictor">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Crop Predictor
                      </a>
                      </Link>
                    </li>
                    <li>
                        <Link to="/insecticidepredictor">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Insecticide Predictor
                      </a>
                      </Link>
                    </li>
                    <li>
                        <Link to="/cropgrowingsteps">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Crop Growing Steps
                      </a>
                      </Link>
                    </li>
                    <li>
                        <Link to="/soilnutrientpredictor">
                      <a
                        href="#"
                        class="block px-4 py-2 whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Soil Nutrient Predictor
                      </a>
                      </Link>
                    </li>
                    <li>
                        <Link to="/infoweather">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Weather Forecast
                      </a>
                      </Link>
                    </li>
                    
                    <li>
                      <a
                        href="https://enam.gov.in/web/dashboard/trade-data" target="_blank"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Estimate Crop Price
                      </a>
                    </li>
                  </ul>
                  
                </div>
                </button>
                {/* <!-- Dropdown menu --> */}
                
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={()=>{
                    setShowCart(1)
                  }}
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={()=>{
                    // window.location.href = "/";
                    setDropBox(1);
                  }}
                >
                  {localStorage.getItem(checkuserlogin) ? "LogOut" : "LogIn"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="z-40">
        <Cart  setShowCart={setShowCart} showCart={showCart}/>
      </section>




      <div
        class={`${
          dropBox ? "" : "hidden"
        } fixed top-0 left-0 z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
        tabindex="-1"
      >
        <div class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto  items-center  min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[700px]">
          <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
             
              </h5>

              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  setDropBox(0);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <UserLogin checkuserlogin={checkuserlogin} setDropBox={setDropBox}/>
            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                class="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal focus:outline-none focus:ring-0 hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  setDropBox(0);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 w-full h-full  ${
          dropBox ? "bg-black bg-opacity-50 z-40" : "-z-40"
        }`}
      ></div>
      




    </>
  );
}

export default Navbar;
