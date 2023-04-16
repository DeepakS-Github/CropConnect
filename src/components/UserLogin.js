import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function UserLogin(props) {

    const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isloggedin, setIsloggedin] = useState(false);
 
  const [userId, setUserId] = useState();
  let userObjId = "userObjId"

  const handleLogin = (email, password) => {
    console.log("Click");

    fetch(`/api/user/login/${email}/${password}`, {// s5 
      method: "GET",
    })
      .then((response) => {
        if (response.status == 200) {
          alert("Please login with correct credentials");
        } else if (response.status == 202) {
          alert("User Login Successful");
          localStorage.setItem(props.checkuserlogin, 124);
          setIsloggedin(true);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log(data._id);
        setUserId(data._id);
        localStorage.setItem(userObjId, data._id);
      })
      .catch((error) => alert("Something went wrong. Try again!"));
  };



  return (
    <section class={`bg-transparent w-full relative right-0 top-0 my-12 bottom-0 z-50`}>
          <div class="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div
                  className={`${
                    localStorage.getItem(props.checkuserlogin) ? "hidden" : "block"
                  }`}
                >
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
                    Sign In to as User
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
                      {/* <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="remember"
                            class="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}
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
                      <Link to={"/usersignup"}>
                      <span
                        href="#"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={(e)=>{
                          e.preventDefault();
                          window.location.href="/usersignup"
                          props.setDropBox(0);
                        }}
                      >
                        Sign up
                      </span>
                      </Link>
                    </p>
                  </form>
                </div>
                <div
                  className={`${
                    localStorage.getItem(props.checkuserlogin) ? "block" : "hidden"
                  }`}
                >
                  <i class="fa-solid fa-circle-check mr-2 text-center w-full  text-rose-700 text-6xl my-2"></i>
                  <h1 class="text-xl font-semibold leading-tight tracking-tight text-gray-900  my-2 md:text-2xl dark:text-white  text-center">
                    <span className="h-full my-auto">Sign In Successful</span>
                  </h1>
                  <button
                    type="button"
                    class="text-white  my-4  w-full mx-auto bg-rose-700 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => {
                      localStorage.removeItem(props.checkuserlogin);
                      localStorage.removeItem("userObjId");
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
  )
}

export default UserLogin
