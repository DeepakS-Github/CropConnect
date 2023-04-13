import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function FarmerDashboard() {
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


  // const { farmerID } = useParams();
  let farmerID = localStorage.getItem("farmerObjId");

  // API Post Request to Item DB
  const handleSubmit = () => {
    setDropBox(0);
    console.log("Click");

    const data = {
      image: `${image}`,
      category: `${category}`,
      farmerId: farmerID,
      brand: `${brand}`,
      title: `${title}`,
      currentprice: `${currentprice}`,
      originalprice: `${originalprice}`,
      stars: 5,
      location: `${location}`,
      about: `${about}`,
    };

    fetch("http://localhost:4500/api/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 500) {
          alert("Please fill all the input fields");
        } else {
          alert("Product added successfully");
          window.location.reload(false);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => alert("Please fill all the input fields"));
  };

 


  // API Fetch to UPDATE Data
  const handleEdit = (toEdit) => {
    console.log(toEdit);
    setDropBox(0);
    console.log("Click");
    
    
    const data = {
      image: `${image}`,
      category: `${category}`,
      farmerId: farmerID,
      brand: `${brand}`,
      title: `${title}`,
      currentprice: `${currentprice}`,
      originalprice: `${originalprice}`,
      stars: 5,
      location: `${location}`,
      about: `${about}`,
    };


    fetch(
      `http://localhost:4500/api/farmerdashboard/getItemData/update/${toEdit}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.status == 500) {
          alert("Please fill all the input fields");
        } else {
          alert("Product edited successfully");
          window.location.reload(false);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => alert("Something went wrong"));
    
  
  };

  // API Fetch to DELETE Data
  const handleDelete = (toDelete) => {

    console.log("Click");

    const data = {
      _id: `${toDelete}`,
    };
    console.log(toDelete);

    fetch(
      `http://localhost:4500/api/farmerdashboard/getItemData/delete/${toDelete}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.status == 500) {
          alert("Something went wrong. Try again!");
        } else {
          alert("Product Deleted Successfully");
          window.location.reload(false);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => alert("Something went wrong. Try again!"));
  };

  // API Fetch to GET Data

  let Sno=0;

  let API = `http://localhost:4500/api/farmerdashboard/getItemData/${farmerID}`;

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

  // Setting Data in Table

  

  const items = data.map((item) => (
    <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 text-center">
      <td class="px-6 py-4 font-medium">{++Sno}</td>
      <td class="px-6 py-4">{item.image}</td>
      <td class="px-6 py-4">{item.category}</td>
      <td class="px-6 py-4">{item.brand}</td>
      <td class="px-6 py-4">{item.title}</td>
      <td class="px-6 py-4">Rs.{item.currentprice}</td>
      <td class="px-6 py-4">Rs.{item.originalprice}</td>
      <td class="px-6 py-4">{item.location}</td>
      <td class=" px-6 py-4 max-w-sm truncate hover:whitespace-normal">
        {item.about}
      </td>
      <td class=" px-6 py-4 flex justify-center items-center gap-2">
        <div
          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700  whitespace-nowrap"
          // onClick={()=>{handleEdit(item._id)}}
          onClick={(e)=>{e.preventDefault();
            setEditID(item._id);
            setEditBox(1);
            setDropBox(1);
          }}
        >
          <i class="fa-regular fa-pen-to-square mr-2"></i>
          <span className="font-medium">Edit</span>
        </div>

        <div
          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-rose-700 whitespace-nowrap"
          onClick={() => {
              handleDelete(item._id);
          }}
        >
          <i class="fa-regular fa-trash-can mr-2"></i>
          <span className="font-medium">Delete</span>
        </div>
      </td>
    </tr>
  ));




       











  return (
    <>
      <div
        className={`fixed inset-0 w-full h-full  ${
          dropBox ? "bg-black bg-opacity-50 z-40" : "-z-40"
        }`}
      ></div>

      {/* Banner Section */}

      <div>
        <section class="overflow-hidden">
          <div class="relative overflow-hidden bg-no-repeat bg-cover h-[500px] bg-[url('https://source.unsplash.com/random/?Farms,Fruits,Vegetables')] bg-center">
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black bg-opacity-75">
              <div class="flex justify-center items-center h-full">
                <div class="text-center text-white px-6 md:px-12">
                  <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                    The best offer on the market <br />
                    <span>for your business</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div class="-mt-2.5 md:-mt-4 lg:-mt-6  h-[50px] scale-[2] origin-center text-white">
            <svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </section>
      </div>

      {/* Form Modal */}

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
              {(editBox)?"Edit Product":"Add Product"}
              </h5>

              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  setDropBox(0);
                  setEditBox(0);
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
            <div class="relative p-4">
              <div class="p-6 space-y-6">
                <form>
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="product-name"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Image
                      </label>
                      <input
                        type="text"
                        name="image"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Apple"
                        required=""
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="category"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Category
                      </label>

                      <select
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="nuts">Nuts</option>
                        <option value="sugar">Sugar</option>
                        <option value="spices">Spices</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="pulses">Pulses</option>
                        <option value="Milk">Milk</option>
                        <option value="pulses">Butter</option>
                        <option value="butter">Cheese</option>
                        <option value="curd">Curd</option>
                        <option value="butter milk">Butter Milk</option>
                        <option value="ghee">Ghee</option>
                        <option value="cream">Cream</option>
                        <option value="yogurt">Yogurt</option>
                      </select>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Current Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Rs.2000"
                        onChange={(e) => setCurrentPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Original Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Rs.3000"
                        onChange={(e) => setOriginalprice(e.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Brand
                      </label>
                      <input
                        type="text"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Evergreen"
                        onChange={(e) => setBrand(e.target.value)}
                        required=""
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="price"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Fresh Apples"
                        onChange={(e) => setTitle(e.target.value)}
                        required=""
                      />
                    </div>
                    <div class="col-span-full">
                      <label class="text-sm font-medium text-gray-900 block mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Kanpur, Uttar Pradesh"
                        onChange={(e) => setLocation(e.target.value)}
                        required=""
                      />
                    </div>
                    <div class="col-span-full">
                      <label
                        for="product-details"
                        class="text-sm font-medium text-gray-900 block mb-2"
                      >
                        About
                      </label>
                      <textarea
                        id="product-details"
                        rows="6"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        placeholder="e.g. Our apples are hand-picked and carefully inspected to ensure that only the best make it to our customers. "
                        onChange={(e) => setAbout(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
              <div
                className="text-xs py-2 px-4 text-white font-medium rounded cursor-pointer uppercase bg-sky-700"
                // onClick={handleSubmit}
                onClick={()=>{if(editBox==1){handleEdit(EditID)}
              else{
                handleSubmit()
              }}}
              >
                {(editBox)?"Edit":"Add"}
              </div>
            </div>
          </div>
        </div>
      </div>


   



      <div className=" mt-12 font-medium text-4xl w-full text-center tracking-wider">OVERVIEW</div>



      <div className={` mx-auto  mt-12`}>
        {/* Table Header */}
        <h1 className="text-3xl font-medium mb-4 px-4">All Products</h1>
        <div className="w-full flex items-center justify-between px-4">
          <div class="mt-1 relative sm:w-64 xl:w-96">
            <input
              type="text"
              name="email"
              id="products-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Search for products"
            />
          </div>
          <div
            className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700"
            onClick={(e) => {
              e.preventDefault();
              setDropBox(1);
            }}
          >
            <i class="fa-regular fa-plus mr-2"></i>Add Product
          </div>
        </div>

        {/* Table */}
        <div class="flex flex-col overflow-x-hidden">
          <div class="sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-x-auto">
                <table class="min-w-full text-center text-sm font-light">
                  <thead class="border-b font-medium bg-gray-100 dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6  py-4">
                        #
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Image
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Brand
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Title
                      </th>
                      <th scope="col" class="px-6 whitespace-nowrap  py-4">
                        Current Price
                      </th>
                      <th scope="col" class="px-6 whitespace-nowrap  py-4">
                        Original Price
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Location
                      </th>
                      <th scope="col" class="px-6 py-4">
                        About
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Operation
                      </th>
                    </tr>
                  </thead>
                  <tbody>{items}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FarmerDashboard;
