import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import useProducts from "../../hooks/products/useProducts";
import { removeAllProductfromCart, setUserLocation } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLocation } from "../../utils/helper/getCurrentLocation";
import NavItem from "../../components/seller_dashboard/NavItem";
import { FaLocationCrosshairs } from "react-icons/fa6";
import LeafletMap from "../../components/map/LeafletMap";
import { RxCross2 } from "react-icons/rx";

function Product() {
  const { type } = useParams();
  const products_per_page = 50;

  const [deliverableProductData, setDeliverableProductData] = useState([]);
  const [nonDeliverableProductData, setNonDeliverableProductData] = useState([]);
  const [page, setPage] = useState(0);

  const userLocation = useSelector((state) => state.userLocationReducer);

  const [selectedLatitute, setSelectedLatitute] = useState(userLocation[1] || 20.59);
  const [selectedLongitude, setSelectedLongitude] = useState(userLocation[0] || 78.96);

  const [showMap, setShowMap] = useState(false);

  const dispatch = useDispatch();

  const { getProductsByCategory, isLoading } = useProducts();

  const [isReachingEnd, setIsReachingEnd] = useState(false);

  

  useEffect(() => {
    const getLocInfo = async () => {
      try {
        const userCoordinates = await getCurrentLocation();
        dispatch(setUserLocation(userCoordinates));
      }
      catch (err) {
        dispatch(removeAllProductfromCart());
      }
    }
    getLocInfo();
  }, []);



  const getProductData = async () => {
    if (!isReachingEnd && selectedLatitute && selectedLongitude) {
      let data = await getProductsByCategory(type, page, products_per_page, selectedLongitude, selectedLatitute);
      let deliverableProductDetails = data.deliverableProducts;
      let nonDeliverableProductDetails = data.nonDeliverableProducts;
      setIsReachingEnd(!data.hasMore);

      setPage(page + 1);
      setDeliverableProductData([...deliverableProductData, ...deliverableProductDetails]);
      setNonDeliverableProductData([...nonDeliverableProductData, ...nonDeliverableProductDetails]);
    }
  };

  // window.innerHeight -> height of the browser window (viewport)
  // window.scrollY -> current vertical scroll position
  // document.body.offsetHeight -> height of the entire content of the webpage

  const fetchData = async () => {
    // if (document.body.offsetHeight <= window.innerHeight) {
    await getProductData();
    // }
  };

  useEffect(() => {
    if(page >= 1) {
      fetchData();
    }
  }, [page, isReachingEnd]);


  useEffect(() => {
    setDeliverableProductData([]);
    setNonDeliverableProductData([]);
    setPage(1);
    setIsReachingEnd(false);
  }, [userLocation]);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 50
  //     ) {
  //       getProductData();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  // }, [window.scrollY, window.innerHeight, document.body.offsetHeight]); // Updated dependency array

  return (
    <>
      <div className="grid gap-4 md:gap-8 my-6 md:my-12 grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {deliverableProductData &&
          deliverableProductData.length > 0 &&
          deliverableProductData.map((data, index) => (
            <ProductCard data={data} key={index} addOverlay={false} />
          ))}
        {nonDeliverableProductData && nonDeliverableProductData.length > 0 && nonDeliverableProductData.map((data, index) => (
          <ProductCard data={data} key={index} addOverlay={true} />
        ))}
        {isLoading && <ProductSkeleton noOfBoxes={products_per_page} />}
      </div>

      {!isLoading && isReachingEnd && (
        <EmptyStateText
          marginY={"my-12"}
          text="Oops! It seems like you have reached at the end of the page in this category. Check back later or explore other categories to find what you're looking for!"
        />
      )}

      <NavItem text={"Choose Location"} icon={<FaLocationCrosshairs />} isSelected={true} className={"fixed bottom-0 left-0 mb-2 ml-2 z-20 rounded-full"} onClick={() => {
        setShowMap(true);
      }} />

      {showMap &&
        <div className="mx-auto w-screen h-full fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30 flex justify-center items-center">
          <div className="absolute opacity-90 bg-black z-30 w-full h-full">

          </div>
          <div className="z-40 w-11/12 h-[90%] relative">
            <div className="absolute bg-red-900 p-2 text-xl rounded-sm right-0 top-0 z-[999] m-2 cursor-pointer text-white" onClick={() => {
              setShowMap(false);
            }}><RxCross2 /></div>
            <div className="absolute bg-red-900 px-3 py-1.5 text-sm font-medium rounded-sm right-0 bottom-0 z-[999] m-2 cursor-pointer text-white">
              {selectedLatitute.toFixed(2)}, {selectedLongitude.toFixed(2)}
            </div>
            <div className="absolute text-red-700 px-3 py-1.5 text-xs font-medium rounded-sm left-[50%] -translate-x-[50%] bottom-0 z-[999] m-2">
              Red Marker: Your Location
            </div>
            <button className="absolute bg-red-900 px-3 py-1.5 font-medium text-sm rounded-sm left-0 bottom-0 z-[999] m-2 cursor-pointer text-white" onClick={() => {
              setShowMap(false);
              dispatch(setUserLocation([selectedLongitude, selectedLatitute]));
            }}>Select Location</button>
            <LeafletMap showSearchBox={true} latitude={selectedLatitute} longitude={selectedLongitude} width="w-full" height="h-full" setLatitude={setSelectedLatitute} setLongitude={setSelectedLongitude} />
          </div>
        </div>
      }


    </>
  );
}

export default Product;
