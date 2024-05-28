import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import { PiSealWarningFill } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { FaRegFaceSmile } from "react-icons/fa6";
import useEmailAuth from "../../hooks/auth/useEmailAuth";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

const Verify = () => {
  const { type, token } = useParams();
  const { verifyAccount } = useEmailAuth();
  const navigate = useNavigate();
  const [src, { blur }] = useProgressiveImg(
    "/images/verify-bg/verify-compressed.webp",
    "/images/verify-bg/verify.webp"
  );


  // console.log("token", token); //token gets automatically decode when passed as a param

  const textColor = type === "seller" ? "text-green-700" : "text-blue-600";

  const [port, setPort] = useState(201);
  const [timeLeft, setTimeLeft] = useState(5);

  const handleVerify = async () => {
    const status = await verifyAccount(type, encodeURIComponent(token));
    setPort(status);
  };

  useEffect(() => {
    handleVerify();
  }, []);

  useEffect(() => {
    let time = timeLeft;
    if (port === 200 || port === 409) {
      const intervalId = setInterval(() => {
        if (time === 0) {
          navigate(`/`);
          clearInterval(intervalId);
        }
        if (timeLeft > 0) {
          --time;
          setTimeLeft((prev) => prev - 1);
        }
      }, 1000);
    }
  }, [port]);

  const message = {
    201: {
      message: (
        <div>
          Verifying{" "}
          <span className={`${textColor} font-bold`}>{type.toUpperCase()}</span>{" "}
          account
        </div>
      ),
      icon: <Spinner color={"white"} width={"w-14"} marginRight="0px" />,
      sideMessage: "Please wait...",
    },
    404: {
      message: (
        <div className="text-rose-600">
          Invalid{" "}
          <span className={`${textColor} font-bold`}>{type.toUpperCase()}</span>{" "}
          token
        </div>
      ),
      icon: <RxCross2 className="text-rose-600 w-14 h-14" />,
      sideMessage: "Please try to login again",
    },
    409: {
      message: (
        <div className="text-cyan-600">
          <span className={`${textColor} font-bold`}>{type.toUpperCase()}</span>{" "}
          account already verified
        </div>
      ),
      icon: <FaRegFaceSmile className="text-cyan-600 w-14 h-14 m-2" />,
      sideMessage: (
        <span>
          Redirecting in {timeLeft} seconds <br /> or you can go back to the
          previous tab
        </span>
      ),
    },
    403: {
      message: (
        <div className="text-yellow-600">
          <span className={`${textColor} font-bold`}>{type.toUpperCase()}</span>{" "}
          token expired
        </div>
      ),
      icon: <PiSealWarningFill className="text-yellow-600 w-14 h-14" />,
      sideMessage: "Please try to login again",
    },
    200: {
      message: (
        <div className="text-green-600">
          <span className={`${textColor} font-bold`}>{type.toUpperCase()}</span>{" "}
          account verified successfully
        </div>
      ),
      icon: <SiTicktick className="text-green-600 w-14 h-14 m-2" />,
      sideMessage: (
        <span>
          Redirecting in {timeLeft} seconds <br /> or you can go back to the
          previous tab
        </span>
      ),
    },
  };

  return (
    <section className="block relative w-full h-screen">
      <div className="absolute inset-0 z-10 bg-black text-gray-200 bg-opacity-70 text-lg  md:text-xl lg:text-2xl font-semibold flex items-center justify-center">
        <div className=" relative bg-gray-900 px-12 pt-10 pb-8 rounded-lg shadow">
          <div className="absolute top-0 bg-gray-900 rounded-full p-3 left-[50%] -translate-x-[50%] -translate-y-[50%]">
            {message[port]?.icon}
          </div>
          {message[port]?.message}
          <div>
            <p className="text-sm text-center text-gray-400 mt-2">
              {message[port]?.sideMessage}
            </p>
          </div>
        </div>
      </div>{" "}
      <div
        className="relative w-full z-0 h-full bg-blue-200"
        style={{
          filter: blur ? "blur(20px)" : "none",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
};

export default Verify;
