import React from "react";
import CategoryCard from "../../components/CategoryCard";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <Link to={"/category/rice"}>
        <CategoryCard
          title="Rice"
          image="https://source.unsplash.com/xmuIgjuQG0M"
        />
      </Link>
      <Link to={"/category/wheat"}>
        <CategoryCard
          title="Wheat"
          image="https://source.unsplash.com/joOVC9d-jis"
        />
      </Link>
      <Link to={"/category/nuts"}>
        <CategoryCard
          title="Nuts"
          image="https://source.unsplash.com/UhrHTmVBzzE"
        />
      </Link>
      <Link to={"/category/sugar"}>
        <CategoryCard
          title="Sugar"
          image="https://source.unsplash.com/u_Mwofs_zu0"
        />
      </Link>
      <Link to={"/category/spices"}>
        <CategoryCard
          title="Spices"
          image="https://source.unsplash.com/uaHShoIDGeo"
        />
      </Link>
      <Link to={"/category/fruits"}>
        <CategoryCard
          title="Fruits"
          image="https://source.unsplash.com/M_xIaxQE3Ms"
        />
      </Link>
      <Link to={"/category/vegetables"}>
        <CategoryCard
          title="Vegetables"
          image="https://source.unsplash.com/5aJVJvJ9rG8"
        />
      </Link>
      <Link to={"/category/pulses"}>
        <CategoryCard
          title="Pulses"
          image="https://source.unsplash.com/TUf3H3vRlNU"
        />
      </Link>
    </div>
  );
}

export default Category;
