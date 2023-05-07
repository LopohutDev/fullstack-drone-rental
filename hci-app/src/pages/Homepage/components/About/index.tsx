import React from "react";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutImage from "../../../../assets/about.png";

const About: React.FC = () => {
  return (
    <div className="flex items-center h-[80vh] ">
      <div className="w-[60%] h-full flex items-center relative">
        <div className="text-5xl bg-[#F4511E] bg-opacity-20 absolute left-0 right-0 h-[60vh] px-52 py-16 text-[#F4511E] text-opacity-30">
          <FontAwesomeIcon icon={faQuoteLeft} />
        </div>
        <div className="z-10 max-w-3xl ml-auto mr-20">
          Located in Philippines and Canada, Hotdog Chikididog is a Authorized
          Drone Listing/Rental and Reseller with a focus on technical support
          from leading industry experts. We take pride in giving each and every
          one of our customers industry-leading expertise about all the products
          we carry. We offer a wide variety of both consumer and professional
          drones for applications that vary from photography to law enforcement
          to search and rescue. In addition to our retail drones, the engineers
          at HotdogChikididog can also build custom drones to design a system
          specifically tailored to the exact needs of your job.
        </div>
      </div>
      <div
        className="flex-1 h-full bg-red-500 bg-center bg-cover"
        style={{ backgroundImage: `url(${AboutImage})` }}
      ></div>
    </div>
  );
};

export default About;
