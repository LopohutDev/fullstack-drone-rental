import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import {
  faChartPie,
  faDollarSign,
  faLayerGroup,
  faSeedling,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import IntroductionCard from "./IntroductionCard";
import IntroBG from "../../../../assets/introBG.jpg";

const Introduction: React.FC = () => {
  const introductionCards = [
    {
      icon: faDollarSign,
      description: "Pay As Little As Possible!",
      isDollar: true,
    },
    {
      icon: faBuilding,
      description: "Enjoy wisdom of Flying a drone!",
      isDollar: false,
    },
    {
      icon: faLayerGroup,
      description: "Let us Take care all the equipment you need!",
      isDollar: false,
    },
    {
      icon: faSeedling,
      description: "Enjoy Top quality drones",
      isDollar: false,
    },
    {
      icon: faShieldHeart,
      description: "Stay Safe! Save Money!",
      isDollar: false,
    },
    {
      icon: faChartPie,
      description: "Pay for what you use !",
      isDollar: false,
    },
  ];

  return (
    <div className="mx-auto my-10 max-w-screen-2xl">
      <div className="text-3xl font-semibold">
        <h1>Minimum Cost Takes Care Of Everything</h1>
        <hr className="w-[20%] bg-[#F4511E] border-0 h-[1.5px]" />
      </div>
      <div className="flex my-5">
        <div
          className="w-[17%] bg-gray-500 h-[400px] rounded-tl-3xl rounded-br-3xl bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${IntroBG})` }}
        >
          <div className="w-full h-full bg-gray-500 opacity-50" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-5 px-10">
          {introductionCards.map((intro) => (
            <IntroductionCard
              icon={intro.icon}
              description={intro.description}
              isDollar={intro.isDollar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
