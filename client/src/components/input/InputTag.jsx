import React from "react";

const InputTag = ({label, type, placeholder, outlineColor}) => {
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm ${outlineColor} rounded-lg block w-full p-2.5`}
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};

export default InputTag;
