import React from "react";
import Category from "./Category";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/Heading";

function Home() {
  return (
    <>
      <Hero />
      <Link to="/products"></Link>
      <div className="mx-auto w-11/12 mb-6 md:mb-12">
        <Heading text="Category" marginY="my-6 md:my-8" textAlign="text-center" />
        <Category />
      </div>
    </>
  );
}

export default Home;
