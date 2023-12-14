import React from 'react'
import ProductDetails from './ProductDetails'
import ProductReviews from './ProductReviews'
import FAQ from './FAQ'
import SellerContact from './SellerContact'

function ProductDashboard() {
  return (
    <>
        <ProductDetails/>
        <ProductReviews/>
        <SellerContact/>
        <FAQ/>
    </>
  )
}

export default ProductDashboard