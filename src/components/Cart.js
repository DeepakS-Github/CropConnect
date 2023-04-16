import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart(props) {
  const userData = localStorage.getItem("userObjId");
  const [dataCart, setDataCart] = useState([]);

  // API Fetch
  let CartAPI = `/api/showCartItem/${userData}`; // 4100 - s1

  const cItem = [];


  useEffect(() => {
    // fetchCartApiData(CartAPI);

    axios
  .get(`/api/showCartItem/${userData}`)// s1
  .then((response) => {
    const mainArr = response.data.itemsId;
    const promises = [];

    for (let i = 0; i < mainArr.length; i++) {
      const nestedApiUrl = `/api/getIdItemData/${mainArr[i]}`; // 4500 -s2

      promises.push(
        axios.get(nestedApiUrl)
          .then((nestedApiResponse) => {
            return nestedApiResponse.data;
          })
          .catch((error) => {
            console.error(error);
            return null;
          })
      );
    }

    Promise.all(promises)
      .then((nestedApiResults) => {
        const filteredResults = nestedApiResults.filter((result) => result !== null);
        setDataCart(filteredResults);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });

      
  }, []);

  const handleDelete = (toDelete) => {
    console.log("Click");

    fetch(`/api/deleteCartItem/${userData}/${toDelete}`, { // s1
      method: "DELETE"
    })
      .then((response) => {
        if (response.status == 500) {
          alert("Something went wrong. Try again!");
        } else {
          alert("Product Deleted Successfully");
          window.location.reload(true);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => alert("Something went wrong. Try again!"));
  };

  let totalAmount = 0;


  const items = () => {
    const itemsList = [];
    for (let i = 0; i < dataCart.length; i++) {
      totalAmount = totalAmount + dataCart[i].currentprice;
      itemsList.push(
        <li class="flex py-6">
          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={`https://source.unsplash.com/random?${dataCart[i].image}`}
              alt="Image"
              class="h-full w-full object-cover object-center"
            />
          </div>

          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div class="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">{dataCart[i].title}</a>
                </h3>
                <p class="ml-4">₹{dataCart[i].currentprice.toFixed(2)}</p>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {dataCart[i].brand}
              </p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
              <p class="text-gray-500">Qty 1</p>

              <div class="flex">
                <button
                  type="button"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    handleDelete(dataCart[i]._id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      );
    }

    return itemsList;
  };

  return (
    <>
      <div
        class={`relative z-40 ${props.showCart ? "block" : "hidden"}`}
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        class="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping Cart
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span class="sr-only">Close panel</span>
                          <svg
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            onClick={() => {
                              props.setShowCart(0);
                            }}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          {items()}

                          {/* <!-- More products... --> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{totalAmount.toFixed(2)}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <a
                        href="#"
                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            props.setShowCart(0);
                          }}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
