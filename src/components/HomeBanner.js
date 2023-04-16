import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function HomeBanner() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isloggedin, setIsloggedin] = useState(false);
  let checklogin = false;
  const [farmerId, setFarmerId] = useState();
  let farmerObjId = "farmerObjId";

  const handleLogin = (email, password) => {
    console.log("Click");

    fetch(`/api/farmer/login/${email}/${password}`, { // s4
      method: "GET",
    })
      .then((response) => {
        if (response.status == 300) {
          alert("Please login with correct credentials");
        } else if (response.status == 302) {
          alert("Login Successful");
          localStorage.setItem(checklogin, true);
          setIsloggedin(true);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data._id);
        setFarmerId(data._id);
        localStorage.setItem(farmerObjId,data._id);
      })
      .catch((error) => alert("Something went wrong. Try again!"));
  };

  return (
    <>
      <section
        class={`relative bg-[url(https://source.unsplash.com/random/?farms)] bg-cover bg-center bg-no-repeat`}
      >
        <div class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div class="max-w-xl text-center sm:text-left">
            <h1 class="text-3xl font-bold sm:text-5xl">
              Crop
              <strong class="font-bold text-rose-700">Connect</strong>
            </h1>

            <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Connecting Farmers and Consumers - Bringing Fresh Produce to Your
              Doorstep!
            </p>
          </div>
        </div>
        <section class={`bg-transparent absolute right-0 top-0 bottom-0`}>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[800px]">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div
                  className={`${
                    localStorage.getItem(checklogin) ? "hidden" : "block"
                  }`}
                >
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
                    Sign In to as Seller
                  </h1>
                  <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        required=""
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <span
                        class="text-sm text-right w-full font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </span>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogin(email, password);
                      }}
                    >
                      Sign In
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link to={"/sellersignup"}>
                      <span
                        href="#"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </span>
                      </Link>
                    </p>
                  </form>
                </div>
                <div
                  className={`${
                    localStorage.getItem(checklogin) ? "block" : "hidden"
                  }`}
                >
                  <i class="fa-solid fa-circle-check mr-2 text-center w-full  text-green-800 text-6xl my-2"></i>
                  <h1 class="text-xl font-semibold leading-tight tracking-tight text-gray-900  my-2 md:text-2xl dark:text-white  text-center">
                    <span className="h-full my-auto">Sign In Successful</span>
                  </h1>
                  <Link to={`/farmerdashboard`}>
                    <button
                      type="button"
                      class="text-white  my-4  w-full mx-auto bg-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Go To Dashboard
                    </button>
                  </Link>
                  <button
                    type="button"
                    class="text-white  my-4  w-full mx-auto bg-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => {
                      localStorage.removeItem(checklogin);
                      // eslint-disable-next-line no-restricted-globals
                      location.reload();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default HomeBanner;
