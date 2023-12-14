import React from "react";
import CategoryCard from "../../components/CategoryCard";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <Link to={"/category/rice"}>
        <CategoryCard
          title="Rice"
          image="https://source.unsplash.com/random/?rice"
        />
      </Link>
      <Link to={"/category/wheat"}>
        <CategoryCard
          title="Wheat"
          image="https://source.unsplash.com/random/?wheat"
        />
      </Link>
      <Link to={"/category/nuts"}>
        <CategoryCard
          title="Nuts"
          image="https://source.unsplash.com/random/?nuts"
        />
      </Link>
      <Link to={"/category/sugar"}>
        <CategoryCard
          title="Sugar"
          image="https://source.unsplash.com/random/?sugar"
        />
      </Link>
      <Link to={"/category/spices"}>
        <CategoryCard
          title="Spices"
          image="https://source.unsplash.com/random/?spices"
        />
      </Link>
      <Link to={"/category/fruits"}>
        <CategoryCard
          title="Fruits"
          image="https://source.unsplash.com/random/?fruits"
        />
      </Link>
      <Link to={"/category/vegetables"}>
        <CategoryCard
          title="Vegetables"
          image="https://source.unsplash.com/random/?vegetables"
        />
      </Link>
      <Link to={"/category/pulses"}>
        <CategoryCard
          title="Pulses"
          image="https://source.unsplash.com/random/?pulses"
        />
      </Link>
    </div>
  );
}

export default Category;
