import React from "react";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import FAQ from "./FAQ";
import SellerContact from "./SellerContact";
import { useSelector } from "react-redux";

function ProductDashboard() {
  const productData = useSelector((state) => state.productReducer);

  return (
    <>
      <div className="space-y-16 md:space-y-24">
        <ProductDetails />
        {productData && (
          <>
            <ProductReviews />
            <SellerContact />
            <FAQ />
          </>
        )}
      </div>
    </>
  );
}

export default ProductDashboard;
