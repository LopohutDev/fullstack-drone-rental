import {
  faDollarSign,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ComponentProps {
  icon: IconDefinition;
  isDollar?: boolean;
  description?: string;
}

const IntroductionCard: React.FC<ComponentProps> = ({
  description,
  icon,
  isDollar,
}) => {
  return (
    <div className="p-5 ">
      <div className="flex items-center justify-center w-16 p-3 bg-white rounded-lg shadow-2xl shadow-gray-500">
        {isDollar ? (
          <div className="border-4 border-[#F4511E] text-[#F4511E] w-10 h-10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-2xl" />
          </div>
        ) : (
          <FontAwesomeIcon icon={icon} className="text-[#F4511E] text-4xl" />
        )}
      </div>
      <p className="mt-5 text-xl font-semibold">{description}</p>
    </div>
  );
};

export default IntroductionCard;
