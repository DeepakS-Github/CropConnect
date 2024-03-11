import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAPI } from "../../utils/api/getRequest";
import Heading from "../../components/heading/Heading";
import { useSelector } from "react-redux";
import AreaGraph from "../../components/graphs/AreaGraph";
import BarGraph from "../../components/graphs/BarGraph";
import GraphSkeleton from "../../components/skeleton/GraphSkeleton";

function SellerOverview() {
  const sellerData = useSelector((state) => state.sellerReducer);

  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const visualizeData = async () => {
    let graphData = await getAPI(`graph/visualize/${sellerData._id}`);
    setDateVsSales(graphData.dateVsSales);
    setCategoryVsSales(graphData.categoryVsSales);
    setIsDataFetching(false);
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <Heading text={"Visualize Your Sales"} textAlign="text-left" />
      {isDataFetching ? (
        <GraphSkeleton noOfBoxes={2} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-4 px-4">
          <AreaGraph
            title="Date v/s Sales"
            lineData={dateVsSales}
            color={"#be123c"}
            xKey={"date"}
            yKey={"totalSales"}
          />
          <BarGraph
            title="Category v/s Sales"
            data={categoryVsSales}
            color={"#be123c"}
            xKey={"category"}
            yKey={"totalSales"}
          />
        </div>
      )}
    </>
  );
}

export default SellerOverview;
