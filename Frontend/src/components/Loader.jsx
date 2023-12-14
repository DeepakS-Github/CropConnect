import PulseLoader from "react-spinners/PulseLoader";
import React from "react";

function Loader(props) {
  return (
    <PulseLoader 
      color={props.color}
      loading="true"
      size={props.size}
      margin={2}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
