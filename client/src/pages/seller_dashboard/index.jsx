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
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/helper/notification";
import SellerOverview from "./SellerOverview";
import { SiGooglebard } from "react-icons/si";
import CropSenseAI from "./CropSenseAI";
import {useCookies} from "react-cookie";


const links = [
  {
    text: "Dashboard",
    icon: <MdDashboard />,
    renderComponent: <SellerOverview />,
  },
  {
    text: "Your Products",
    icon: <FaProductHunt />,
    renderComponent: <SellerProducts />,
  },
  {
    text: "Your Orders",
    icon: <PiShoppingBagOpenFill />,
    renderComponent: <SellerOrderRequests />,
  },
  {
    text: "Your FAQs",
    icon: <FaQq />,
    renderComponent: <SellerFAQs />,
  },
  {
    text: "CropSense AI",
    icon: <SiGooglebard />, 
    renderComponent: <CropSenseAI />,
  }
];

const NewSellerDashboard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["seller_access_token", "brandName"]);

  const [selected, setSelected] = useState(0);
  

  return (
    <div className="w-full flex flex-row h-[calc(100vh-50px)]">
      <div className="w-2/12 shadow-sm bg-gray-100 flex justify-between  py-4 px-2 flex-col">
        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <NavItem
            key={index}
              text={link.text}
              icon={link.icon}
              isSelected={selected === index}
              onClick={() => setSelected(index)}
            />
          ))}
        </div>
        <div className="border-t-2 border-gray-50">
          <NavItem
            text="Logout"
            icon={<TbLogout2 />}
            onClick={() => {
              setCookie("seller_access_token", "", {expires: new Date(0) });
              setCookie("brandName", "", {expires: new Date(0) });

              navigate("/");
              notify("Seller Logged Out", "info");
            }}
          />
        </div>
      </div>
      <div className="w-10/12 overflow-auto">
        {links[selected].renderComponent}
      </div>
    </div>
  );
};

export default NewSellerDashboard;
