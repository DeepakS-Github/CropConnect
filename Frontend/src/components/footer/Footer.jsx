import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGooglePlusG } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-red-900 mt-12  text-white py-2 md:py-4 px-4 md:px-12 text-center flex flex-row items-center justify-between">
        <p className="font-semibold text-sm md:text-base">Made by Deepak</p>
        <div className="flex flex-row text-lg md:text-2xl gap-3 md:gap-5">
          <a href={"https://github.com/DeepakS-Github"} target="_blank">
            <FaGithub />
          </a>
          <a href={"https://www.linkedin.com/in/thisisdeepak/"} target="_blank">
            <FaLinkedinIn />
          </a>
          <a href={"/"}>
            <FaGooglePlusG />
          </a>
          <a href={"https://www.instagram.com/this_is__deepaks/"} target="_blank">
            <FaInstagram />     
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
