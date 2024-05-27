import React, { useEffect, useState } from "react";
import ProductCard from "../../components/products/ProductCard";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import useProducts from "../../hooks/products/useProducts";

function Product() {
  const { type } = useParams();

  const [productData, setProductData] = useState([]);

  const { getProductsByCategory, isLoading } = useProducts();

  const getProductData = async () => {
    let products = await getProductsByCategory(type);
    setProductData(products);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : productData.length === 0 ? (
        <EmptyStateText
          marginY={"mt-12"}
          text="Oops! It seems like there are no products available in this category at the moment. Check back later or explore other categories to find what you're looking for!"
        />
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
