import React from "react";
import VerificationLogo from "../../assets/verificationimage.png";
import Verification from "../../features/Verification";

const VerificationPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full m-5 md:w-2/5 md:pt-10 md:m-0">
        <div className="text-center">
          <h2 className="text-4xl font-medium md:pb-5">Verification</h2>
          <Verification />
        </div>
      </div>

      <div className="relative h-screen md:w-3/5 bg-[#f4501ecc]">
        <img
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          src={VerificationLogo}
          alt="signup-pic"
        />
      </div>
    </div>
  );
};
export default VerificationPage;
