import React, { useEffect, useState } from "react";
import CartCard from "../../components/cart/CartCard";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/helper/notification";

function Cart({ setOpenCart }) {
  const navigate = useNavigate();

  const cartData = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.userReducer);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    cartData.map((item) => {
      amount = amount + item.currentPrice;
    });
    setTotalAmount(amount);
  }, [cartData]);

  return (
    <>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <div className="pointer-events-auto w-screen md:max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Shopping Cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenCart(false);
                          }}
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
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

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartData.map((item, index) => (
                            <CartCard item={item} key={index} />
                          ))}
                          {/* <!-- More products... --> */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs.{totalAmount}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                        <span className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer" onClick={()=>{
                          if(cartData.length===0){
                            notify("Please add some products to cart first","info")
                          }
                          else if(userData){
                            navigate('/orders');
                            setOpenCart(false);
                          }
                          else{
                            notify("Please login as user first","info")
                          }
                        }}>
                          Checkout
                        </span>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenCart(false);
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
