import React from "react";
import LogoWhite from "../../assets/logo-no-bg.png";
import Louie from "../../assets/team/louie.jpg";
import Jonas from "../../assets/team/jonas.png";
import Jerome from "../../assets/team/jerome.png";
import Bea from "../../assets/team/bea.png";
import Blesse from "../../assets/team/blesse.png";

const About: React.FC = () => {
  const team = [
    {
      img: Louie,
      fullname: "Louie Jay Sarraga",
      position: "Full Stack Developer",
    },
    {
      img: Jonas,
      fullname: "Jonas Generao",
      position: "Ui/Ux Designer",
    },
    ,
    {
      img: Jerome,
      fullname: "Jerome Gutierriez",
      position: "Research",
    },
    {
      img: Bea,
      fullname: "Bea Bianca Mejillano",
      position: "Research",
    },
    {
      img: Blesse,
      fullname: "Blesse Talagasya",
      position: "Research",
    },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div
        className="p-10 text-center bg-[#f4501eb2] mt-10 bg-no-repeat bg-center bg-contain text-white"
        style={{ backgroundImage: `url('${LogoWhite}')` }}
      >
        <h1 className="text-4xl font-medium ">About Us</h1>
        <p className="max-w-sm mx-auto mt-5">
          Located in Philippines and Canada, Hotdog Chikididog is a Authorized
          Drone Listing/Rental and Reseller with a focus on technical support
          from leading industry experts.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-5 p-10 bg-gray-200">
        {team.map((t) => (
          <div className="flex flex-col items-center">
            <div
              className="p-10 bg-gray-400 bg-center bg-no-repeat bg-cover rounded-full"
              style={{ backgroundImage: `url(${t?.img})` }}
            ></div>
            <p className="mt-2 text-lg font-medium">{t?.fullname}</p>
            <p className="font-semibold ">{t?.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
