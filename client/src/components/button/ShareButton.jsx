import React from "react";
import { FaShareAlt } from "react-icons/fa";

const ShareButton = ({url}) => {
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: url
        })
        .then(() => {
          console.log("Sharing successfull");
        })
        .catch(() => {
          console.log("Sharing failed");
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  return (
    <button
      onClick={handleShareButton}
      className="bg-white shadow-lg rounded-full px-4 py-1 md:px-6 md:py-1.5 font-semibold text-sm md:text-base text-black flex items-center gap-2 justify-center"
    >
        <FaShareAlt className="text-sm md:text-base" />
      Share
    </button>
  );
};

export default ShareButton;
