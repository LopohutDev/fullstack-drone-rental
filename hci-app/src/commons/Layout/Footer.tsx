import React from "react";
import Logo from "../../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitter,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
  return (
    <div className="p-5 mx-auto mt-5 max-w-screen-2xl">
      <hr className="w-full border-[1.5px] border-[#F4511E] bg-[#F4511E] rounded-full" />
      <div className="flex items-center justify-between gap-10 pt-20 pb-10">
        <img src={Logo} alt="Logo" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-xl text-[#F4511E]"
            />{" "}
            Fort Bonifacio (Taguig), Post Proper Northside (Makati)
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-xl text-[#F4511E]"
              />
              (123) 456-7890
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPrint}
                className="text-xl text-[#F4511E]"
              />
              (123) 456-7890
            </div>
          </div>
          <div className="flex gap-2">
            <p>Social Media</p>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className="text-xl text-[#F4511E]"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-xl text-[#F4511E]"
            />
            <FontAwesomeIcon
              icon={faYoutubeSquare}
              className="text-xl text-[#F4511E]"
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between py-10 text-lg">
        <div className="flex gap-5 font-semibold">
          <p>Home</p>
          <p>About us</p>
          <p>Contact us</p>
          <p>Privacy Policy</p>
        </div>
        <p className="text-gray-400">
          Copyright @ 2022 HotdogChikidog. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
