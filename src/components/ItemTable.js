import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ItemTable() {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const itcategory = category.toLowerCase();
  console.log(itcategory)


  let API = `/api/getItemData/${itcategory}`;//s2
  

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

  let rating = [];

  let printStars = (num) => {
    rating = [];
    for (let i = 1; i <= num; i++) {
      rating.push(<i class="fa-solid fa-star"></i>);
    }
    for (let i = num + 1; i <= 5; i++) {
      rating.push(<i class="fa-regular fa-star"></i>);
    }
  };

  const items = data.map((item) => (
    <Link to={`/itemboard/${JSON.stringify(item)}`}>
      <div class="mb-6 lg:mb-6">
        <div class="relative block bg-white rounded-lg shadow-lg">
          <div class="flex">
            <div
              class="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <img
                src={`https://source.unsplash.com/random/425x265?${item.image}`}
                class="w-full"
              />
            </div>
          </div>
          <div class="p-6">
            <h5 className="text-left text-sm">{item.brand}</h5>
            <h3 className="text-left font-bold  text-lg mb-2">{item.title}</h3>
            <h2 class="text-xl text-left mb-1 font-medium">
              Rs.{item.currentprice}
              <span className="ml-1 text-base line-through text-gray-500 font-normal">
                Rs.{item.originalprice}
              </span>
              <span className="text-sm ml-1 text-green-600 font-medium">
                {(
                  ((item.originalprice - item.currentprice) /
                    item.originalprice) *
                  100
                ).toFixed(2)}
                %
              </span>
            </h2>
            <h6 className="text-left mb-2 text-sm  font-medium text-green-600">
              Top Discounts
            </h6>
            <h2 className="text-left mb-2 text-amber-500">
              {printStars(item.stars)}
              {rating}
            </h2>
            <p class="mb-4 pb-2 text-left">
              <i class="fa-sharp fa-solid fa-location-dot mr-1 text-md text-red-500"></i>{" "}
              {item.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      <div class="container my-24 px-6 mx-auto">
        <section class="mb-32 text-gray-800 text-center">
          <h2 class="text-3xl font-bold mb-12 pb-4 text-center">
            Top Results for {category}
          </h2>

          <div class="grid lg:grid-cols-3 gap-6 xl:gap-x-12">{items}</div>
        </section>
      </div>
    </>
  );
}

export default ItemTable;
