import React from "react";
import LeafletMap from "../../components/map/LeafletMap";
import { useParams } from "react-router-dom";

const ShowMap = () => {
  const { latitude, longitude } = useParams();

  return <LeafletMap latitude={latitude} longitude={longitude} />;
};

export default ShowMap;
