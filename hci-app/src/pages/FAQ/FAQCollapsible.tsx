import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ComponentProps {
  question: string;
  answer: string;
  isActive?: boolean;
  onToggle: () => void;
}

const FAQCollapsible: React.FC<ComponentProps> = ({
  answer,
  question,
  isActive,
  onToggle,
}) => {
  return (
    <div
      className={`py-5 border-t-2 border-gray-300 overflow-hidden ${
        isActive ? "max-h-[500px]" : "max-h-[60px]"
      } transition-all duration-500 ease-in-out`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{question}</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className={`text-xl transition-all duration-300 ease-in-out ${
            isActive && "rotate-45"
          }`}
        />
      </div>
      <p className="mt-2 mr-5 text-lg font-semibold text-gray-500">{answer}</p>
    </div>
  );
};

export default FAQCollapsible;
