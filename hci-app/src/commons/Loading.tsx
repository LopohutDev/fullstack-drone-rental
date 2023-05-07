import React from "react";
import LoadingIconImage from "../assets/loading.png";

const Loading: React.FC = () => {
  return (
    <div className="block top-0 left-0 fixed h-screen w-full bg-gradient-to-r from-[#009EFF] to-[#0099FF] ">
      <div className="flex items-center justify-center h-full">
        <img
          className="w-16 animate-spin"
          src={LoadingIconImage}
          alt="loading-icon"
        />
        <h2 className="pt-5 text-2xl text-white">Just a moment . . .</h2>
      </div>
    </div>
  );
};
export default Loading;
