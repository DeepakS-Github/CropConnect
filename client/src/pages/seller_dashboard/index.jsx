import React, { useState } from "react";
import NavItem from "../../components/seller_dashboard/NavItem";
import { FaProductHunt } from "react-icons/fa6";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { FaQq } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import SellerProducts from "./SellerProducts";
import SellerOrderRequests from "./SellerOrderRequests";
import SellerFAQs from "./SellerFAQs";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { notify } from "../../utils/helper/notification";
import SellerOverview from "./SellerOverview";
import { RiBardFill } from "react-icons/ri";
import CropSenseAI from "./CropSenseAI";
import { useCookies } from "react-cookie";


const links = [
  {
    text: "Dashboard",
    icon: <MdDashboard />,
    renderComponent: <SellerOverview />,
    path: "overview"
  },
  {
    text: "Your Products",
    icon: <FaProductHunt />,
    renderComponent: <SellerProducts />,
    path: "products"
  },
  {
    text: "Your Orders",
    icon: <PiShoppingBagOpenFill />,
    renderComponent: <SellerOrderRequests />,
    path: "orders"
  },
  {
    text: "Your FAQs",
    icon: <FaQq />,
    renderComponent: <SellerFAQs />,
    path: "faqs"
  },
  {
    text: "CropSense AI",
    icon: <RiBardFill />,
    renderComponent: <CropSenseAI />,
    path: "cropsense-ai"
  }
];

const NewSellerDashboard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["seller_access_token", "brandName"]);

  return (
    <div className="w-full flex flex-row h-[calc(100vh-50px)]">
      <div className="w-2/12 shadow-sm bg-gray-100 flex justify-between  py-4 px-2 flex-col">
        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex flex-row items-center gap-2 py-2 text-base justify-center md:justify-start ${isActive ? 'bg-rose-700 text-slate-100 shadow-md' : 'text-gray-700 hover:bg-gray-200'
                } px-4 font-medium rounded-md cursor-pointer transition duration-100 ease-in-out`
              }
            >

              <span className="text-lg">{link.icon}</span>
              <span className="hidden md:block">{link.text}</span>
            </NavLink>
          ))}
        </div>
        <div className="border-t-2 border-gray-50">
          <NavItem
            text="Logout"
            icon={<TbLogout2 />}
            onClick={() => {
              console.log("Seller log out clicked");
              setCookie("seller_access_token", "", { expires: new Date(0) });
              setCookie("brandName", "", { expires: new Date(0) });

              navigate("/");
              notify("Seller Logged Out", "info");
            }}
            className={"w-full"}
          />
        </div>
      </div>
      <div className="w-10/12 overflow-auto">
        <Outlet />
        {/* {links[selected].renderComponent} */}
      </div>
    </div>
  );
};

export default NewSellerDashboard;
