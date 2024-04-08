import React from "react";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import FAQ from "./FAQ";
import SellerContact from "./SellerContact";

function ProductDashboard() {
  return (
    <>
      <div className="space-y-16 md:space-y-24">
        <ProductDetails />
        <ProductReviews />
        <SellerContact />
        <FAQ />
      </div>
    </>
  );
}

export default ProductDashboard;
