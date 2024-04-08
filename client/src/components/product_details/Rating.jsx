import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({rate, setRate, size}) => {
//   const [rate, setRate] = useState(0);

  return (
    <div className={`flex justify-center items-center ${size}`}>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={givenRating} className="cursor-pointer">
            <input
              type="radio"
              value={givenRating}
              className="hidden"
              onClick={(e) => {
                e.preventDefault();
                setRate(()=>givenRating);
              }}
            />
            <div className="cursor-pointer ">
              <FaStar
                className={`${
                  givenRating < rate || givenRating === rate
                    ? "text-teal-500"
                    : "text-gray-300"
                }`}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
