import React from "react";

const NavItem = ({ text, icon, isSelected = false, onClick }) => {
  return (
    <div
      className={`w-full flex flex-row items-center gap-2 py-2 text-base justify-center md:justify-start ${
        isSelected ? "bg-rose-700 text-slate-100 shadow-md" : "text-gray-700 hover:bg-gray-200 "
      }  px-4 font-medium rounded-md cursor-pointer transition duration-100 ease-in-out`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden md:block">{text}</span>
    </div>
  );
};

export default NavItem;
