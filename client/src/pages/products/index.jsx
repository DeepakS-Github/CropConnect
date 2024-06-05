import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import useProducts from "../../hooks/products/useProducts";

function Product() {
  const { type } = useParams();
  const products_per_page = 4;

  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const { getProductsByCategory, isLoading } = useProducts();

  const [isReachingEnd, setIsReachingEnd] = useState(false);

  const getProductData = async () => {
    if (!isReachingEnd) {
      let data = await getProductsByCategory(type, page, products_per_page);
      let productDetails = data.products;
      console.log(productDetails);
      console.log(data.hasMore);
      setIsReachingEnd(!data.hasMore);

      setPage(page + 1);
      setProductData([...productData, ...productDetails]);
    }
  };

  // window.innerHeight -> height of the browser window (viewport)
  // window.scrollY -> current vertical scroll position
  // document.body.offsetHeight -> height of the entire content of the webpage

  const fetchData = async () => {
    if (document.body.offsetHeight <= window.innerHeight) {
      await getProductData();
    }
  };

  useEffect(() => {
    fetchData();
  });


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        getProductData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [window.scrollY, window.innerHeight, document.body.offsetHeight]); // Updated dependency array

  return (
    <>
      <div className="grid gap-4 md:gap-8 my-6 md:my-12 grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
        {productData &&
          productData.length > 0 &&
          productData.map((data, index) => (
            <ProductCard data={data} key={index} />
          ))}
        {isLoading && <ProductSkeleton noOfBoxes={products_per_page} />}
      </div>

      {!isLoading && isReachingEnd && (
        <EmptyStateText
          marginY={"my-12"}
          text="Oops! It seems like you have reached at the end of the page in this category. Check back later or explore other categories to find what you're looking for!"
        />
      )}
    </>
  );
}

export default Product;
