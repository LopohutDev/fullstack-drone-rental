import React from "react";
import HeaderBanner from "../../assets/headerBanner.jpg";
import About from "./components/About";
import DroneListing from "./components/DroneListing";
import Introduction from "./components/Introduction";
import Model from "./components/Model";

const Homepage: React.FC = () => {
  return (
    <div>
      <div
        className="flex items-center h-[80vh] bg-red-500 bg-center bg-cover"
        style={{ backgroundImage: `url(${HeaderBanner})` }}
      >
        <h1 className="w-full max-w-md ml-32 text-4xl font-bold leading-snug text-gray-50">
          The Most Affordable Place To Get Your Own Drone
        </h1>
      </div>
      <Introduction />
      <DroneListing />
      <Model />
      <About />
    </div>
  );
};

export default Homepage;
