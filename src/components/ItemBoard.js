import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemBoard() {
  const { itemData } = useParams();

  const itData = JSON.parse(itemData);
  console.log("itemData", itData);
  const [data, setData] = useState();


  let userData = localStorage.getItem("userObjId");

  let rating = [];

  let printStars = (num) => {
    rating = [];
    for (let i = 1; i <= num; i++) {
      rating.push(<i class="fa-solid fa-star text-amber-500"></i>);
    }
    for (let i = num + 1; i <= 5; i++) {
      rating.push(<i class="fa-regular fa-star text-amber-500"></i>);
    }
  };

  const [hasError, setHasError] = useState(false);

  function handleError() {
    setHasError(true);
  }

  // API Fetch
  let API = `http://localhost:3700/api/farmer/getFarmerData/${itData.farmerId}`;

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, []);

  const handleAddToCart = (toAdd) => {
    console.log("Click");
    if(userData===null){
      alert("Login To Your Account")
      return;
    }

    fetch(`http://localhost:4100/api/addCartItem/${userData}/${toAdd}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.status == 500) {
          alert("Something went wrong. Try again!");
        } else {
          alert("Product Added To Cart Successfully");
          window.location.reload(false);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => alert("Something went wrong. Try again!"));
  };

  // const items = data.map((item) => (
  //   <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
  //     <div class="lg:w-1/2 px-6">
  //       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
  //         ADDRESS
  //       </h2>
  //       <p class="mt-1">{item.address}</p>
  //     </div>
  //     <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
  //       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
  //         EMAIL
  //       </h2>
  //       <a class="leading-relaxed">{item.email}</a>
  //       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs mt-4">
  //         PHONE
  //       </h2>
  //       <p class="leading-relaxed">{item.phoneNo}</p>
  //     </div>
  //   </div>
  // ));

  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-11/12 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`https://source.unsplash.com/random/400x400?${itData.image}`}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {itData.brand}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {itData.title}
              </h1>
              <div class="flex mb-4">
                <span>
                  {printStars(itData.stars)}
                  {rating}
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="leading-relaxed">{itData.about}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
              <div className="flex justify-between">
              <div>
                <div className="text-green-600 font-medium">
                  Rs.{itData.originalprice - itData.currentprice} off
                </div>
                <div class="flex justify-between">
                  <h2 class="text-4xl text-left mb-1 font-medium">
                    Rs.{itData.currentprice}
                    <span className="ml-3 text-xl line-through text-gray-500 font-normal">
                      Rs.{itData.originalprice}
                    </span>
                    <span className="text-lg ml-3 text-green-600 font-medium">
                      {(
                        ((itData.originalprice - itData.currentprice) /
                          itData.originalprice) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </h2>
                </div>
              </div>
              <button class="flex mb-4 mt-1  text-white bg-[#e11d48] border-0 py-4 px-12 focus:outline-none hover:bg-[#e5345a] rounded">
                  <span className="flex items-center text-lg h-full w-full justify-center" onClick={(e)=>{
                    e.preventDefault();
                    handleAddToCart(itData._id);
                  }}>
                    <i class="fa-solid fa-bag-shopping text-xl mr-2"></i>Add To
                    Cart
                  </span>
                </button>
                </div>

              
            </div>
          </div>

          <div class="lg:w-11/12 mx-auto flex mt-24 flex-wrap">
            <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
              <div className="flex flex-col justify-start items-start w-full space-y-8">
                <div className="flex w-full justify-center items-start">
                  <h2 class="text-gray-900 text-center text-3xl title-font font-medium">
                    Reviews
                  </h2>
                </div>

                <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
                  <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                      <p className="text-xl md:text-2xl font-medium leading-normal text-teal-600">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <div className="cursor-pointer mt-2 md:mt-0">
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-regular fa-star text-teal-500"></i>
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    ipsum enim provident recusandae, esse hic, fugit cupiditate
                    ex sed maiores voluptatibus dolorum! Exercitationem soluta
                    ipsa quod voluptates. Optio, consequuntur est.
                  </p>
                  <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                    <div>
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},oncake`}
                        alt="chair-1"
                      />
                    </div>
                    <div>
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},cutting`}
                        alt="chair-2"
                      />
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},indrink`}
                        alt="chair-3"
                      />
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},indrawer`}
                        alt="chair-4"
                      />
                    </div>
                  </div>
                  <div className="md:hidden carousel pt-8 cursor-none">
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="bag"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="shoes"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell"></div>
                  </div>
                </div>
                <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
                  <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                      <p className="text-xl md:text-2xl font-medium leading-normal text-teal-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className="cursor-pointer mt-2 md:mt-0">
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-solid fa-star text-teal-500"></i>
                      <i class="fa-regular fa-star text-teal-500"></i>
                    </div>
                  </div>
                  <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet nihil, necessitatibus ex ipsa distinctio velit
                    architecto reiciendis. Facilis officia ad maiores deserunt
                    ratione! Quia accusantium nam, iure nobis sed tenetur ipsam
                    at iusto optio nihil fugit dicta deleniti repudiandae harum!
                  </p>
                  <div className="hidden md:flex mt-6 flex-row justify-start items-start space-x-4">
                    <div>
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},fruit`}
                        alt="chair-1"
                      />
                    </div>
                    <div>
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},fruits`}
                        alt="chair-2"
                      />
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={`https://source.unsplash.com/random/120x120?${itData.image},ontable`}
                        alt="chair-3"
                      />
                    </div>
                  </div>
                  <div className="md:hidden carousel pt-8 cursor-none">
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="bag"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="shoes"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/QXzVpHp/vincent-wachowiak-8g-Cm-EBVl6a-I-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell">
                      <div className="md:w-full h-full relative">
                        <img
                          src="https://i.ibb.co/znYKsbc/vincent-wachowiak-z-P316-KSOX0-E-unsplash-1.png"
                          alt="wallet"
                          className="w-full h-full object-fit object-cover"
                        />
                      </div>
                    </div>
                    <div className="carousel-cell"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-11/12 mx-auto flex flex-wrap">
            <section class="text-gray-600 body-font relative">
              <div class="container  py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                  {hasError ? (
                    <h1>Something went wrong.</h1>
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5657354084187!2d76.1881151755368!3d31.48113007423195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb198180014f%3A0xbf76347093a3aa9a!2sIndian%20Institute%20of%20Information%20Technology%20(IIIT)%20Una!5e0!3m2!1sen!2sin!4v1681507459197!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      frameborder="0"
                      title="map"
                      marginheight="0"
                      marginwidth="0"
                      scrolling="no"
                      className=" w-full h-full absolute inset-0 "
                      onError={handleError}
                    />
                  )}
                  {/* <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                    <div class="lg:w-1/2 px-6">
                      <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
                        ADDRESS
                      </h2>
                      <p class="mt-1">
                        {APIdata[0].address}
                      </p>
                    </div>
                    <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                      <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
                        EMAIL
                      </h2>
                      <a class="leading-relaxed">{APIdata[0].email}</a>
                      <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs mt-4">
                        PHONE
                      </h2>
                      <p class="leading-relaxed">{APIdata[0].phoneNo}</p>
                    </div>
                  </div> */}
                   {/* <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
     <div class="lg:w-1/2 px-6">
       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
         ADDRESS
       </h2>
       <p class="mt-1">{data.address}</p>
     </div>
     <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs">
         EMAIL
       </h2>
       <a class="leading-relaxed">{data.email}</a>
       <h2 class="title-font font-semibold text-rose-600 tracking-widest text-xs mt-4">
         PHONE
       </h2>
       <p class="leading-relaxed">{data.phoneNo}</p>
     </div>
   </div> */}
                </div>

                <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                  <h2 class="text-green-600 text-lg mb-1 font-medium title-font">
                    Contact Farmer
                  </h2>
                  <p class="leading-relaxed mb-5 text-gray-600">
                    Many farmers are more than happy to discuss their farming
                    practices and answer any queries you may have about their
                    products.
                  </p>
                  <div class="relative mb-4">
                    <label for="name" class="leading-7 text-sm text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative mb-4">
                    <label
                      for="message"
                      class="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-50 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  <button class="text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Send
                  </button>
                  <p class="text-xs text-gray-500 mt-3">
                    Using Feedback to Improve Quality
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div class="lg:w-11/12 mx-auto flex flex-wrap">
            <div class="container mt-24 px-6 mx-auto">
              <section class=" text-gray-900">
                <h2 class="text-gray-900 text-center text-3xl title-font font-medium mb-12">
                  Frequently asked questions
                </h2>

                <div class="grid lg:grid-cols-3 gap-6">
                  <div class="mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Anim pariatur cliche reprehenderit?
                    </p>
                    <p class="text-gray-500">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Sunt autem numquam dolore molestias aperiam culpa alias
                      veritatis architecto eos, molestiae vitae ex eligendi
                      libero eveniet dolorem, doloremque rem aliquid
                      perferendis.
                    </p>
                  </div>

                  <div class="mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Non cupidatat skateboard dolor brunch?
                    </p>
                    <p class="text-gray-500">
                      Distinctio corporis, iure facere ducimus quos consectetur
                      ipsa ut magnam autem doloremque ex! Id, sequi. Voluptatum
                      magnam sed fugit iusto minus et suscipit? Minima sunt at
                      nulla tenetur, numquam unde quod modi magnam ab deserunt
                      ipsam sint aliquid dolores libero repellendus cupiditate
                      mollitia quidem dolorem odit
                    </p>
                  </div>

                  <div class="mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Praesentium voluptatibus temporibus consequatur non
                      aspernatur?
                    </p>
                    <p class="text-gray-500 ">
                      Minima sunt at nulla tenetur, numquam unde quod modi
                      magnam ab deserunt ipsam sint aliquid dolores libero
                      repellendus cupiditate mollitia quidem dolorem.
                    </p>
                  </div>

                  <div class="col-md-12 mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Voluptatum magnam sed fugit iusto minus et suscipit?
                    </p>
                    <p class="text-gray-500">
                      Laudantium perferendis, est alias iure ut veniam suscipit
                      dolorem fugit. Et ipsam corporis earum ea ut quae cum non
                      iusto blanditiis ipsum dolor eius reiciendis, velit
                      adipisci quas.
                    </p>
                  </div>

                  <div class="mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Minima sunt at nulla tenetur,?
                    </p>
                    <p class="text-gray-500 ">
                      Numquam unde quod modi magnam ab deserunt ipsam sint
                      aliquid dolores libero repellendus cupiditate mollitia
                      quidem dolorem odit
                    </p>
                  </div>

                  <div class="mb-12">
                    <p class="font-bold mb-4 text-pink-500">
                      Distinctio corporis, iure facere ducimus?
                    </p>
                    <p class="text-gray-500">
                      Eaque eos corrupti debitis tenetur repellat, beatae
                      quibusdam incidunt, fuga non iste dignissimos officiis nam
                      officia obcaecati commodi ratione qui nesciunt.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemBoard;
