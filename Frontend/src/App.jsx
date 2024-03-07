// import './App.css'
import React from "react";
import LoginAndSignup from "./pages/account/LoginAndSignup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/products/Product";
import Navbar from "./components/navbar/Navbar";
import SellerDashboard from "./pages/seller_dashboard/SellerDashboard";
import ProductDashboard from "./pages/product_details/ProductDashboard";
import Order from "./pages/orders/Order";
import LeafletMap from "./components/map/LeafletMap";
import SellerProductOperation from "./pages/seller_product_operation/SellerProductOperation";
import ShowMap from "./pages/map/ShowMap";
import { Analytics } from "@vercel/analytics/react"
import ScrollToTop from "./components/scroll/ScrollToTop";
import Footer from "./components/footer/Footer";


function App() {
  
  return (
    <>
      <Router>
        <ScrollToTop/>
        <Navbar />
        <div className="max-h-[calc(100vh-50px)]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/account/:type" element={<LoginAndSignup />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/sellerdashboard" element={<SellerDashboard/>} />
          <Route exact path="/map/:latitude/:longitude" element={<ShowMap/>} />
          <Route exact path="/sellerdashboard/product/:operation" element={<SellerProductOperation/>} />
          <Route exact path="/category/:type" element={<Product/>} />
          <Route exact path="/category/:type/details" element={<ProductDashboard/>} />
          <Route exact path="/orders" element={<Order/>} />
          <Route exact path="/map" element={<LeafletMap/>} />
        </Routes>
        </div>
      </Router>
      <Footer/>
      <Analytics/>
    </>
  );
}

export default App;
