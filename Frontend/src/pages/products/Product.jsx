import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { useParams } from "react-router-dom";
import { getAPI } from "../../utils/api/getRequest";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";

function Product() {
  const { type } = useParams();

  const [productData, setProductData] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const getProductData = async () => {
    let data = await getAPI(`product/getProductDataByCategory/${type}`);
    setProductData(data);
    setIsDataFetching(false);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {isDataFetching ? (
        <ProductSkeleton />
      ) : productData.length === 0 ? (
        <EmptyStateText marginY={"mt-12"} text="Oops! It seems like there are no products available in this category at the moment. Check back later or explore other categories to find what you're looking for!" />
      ) : (
        <div className="grid gap-4 md:gap-8 my-6 md:my-12 grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto">
          {productData.map((data, index) => (
            <ProductCard data={data} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
