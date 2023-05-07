import React from "react";
import Error404 from "../../assets/error404.png";

const Error404Page: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-[#F4511E]">
        <div>
          <div className="mb-6">
            <img src={Error404} alt="errorLogo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
