import React from "react";
import useProgressiveImg from "../../hooks/image/useProgressiveImg";

function Hero() {
  const [src, { blur }] = useProgressiveImg(
    "/images/home-banner/home-compressed.webp",
    "/images/home-banner/home.webp"
  );

  return (
    <>
      <section
        className={`relative overflow-hidden  lg:flex h-[30vh] sm:h-[30vh] lg:h-screen lg:items-center `}
      >
        <div className="z-10 absolute mx-auto max-w-screen-xl lg:px-24 py-20 sm:py-44 px-4 sm:px-6">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-bold md:text-5xl">
              Crop
              <strong className="font-bold text-rose-700">Connect</strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Connecting Farmers and Consumers - Bringing Fresh Produce to Your
              Doorstep!
            </p>
          </div>
        </div>
        <div
          className="relative w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.25)), url(${src})`,
            filter: blur ? "blur(20px)" : "none",
            // backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </section>
    </>
  );
}

export default Hero;
