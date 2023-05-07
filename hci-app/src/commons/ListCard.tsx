import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryThreeQuarters,
  faGaugeSimpleHigh,
} from "@fortawesome/free-solid-svg-icons";
import faDrone from "../assets/drone.png";
import { useNavigate } from "react-router-dom";
import { Item } from "../models/item.model";

interface ComponentProps {
  onClick?: () => void;
  item?: Item;
}

const ListCard: React.FC<ComponentProps> = ({ onClick, item }) => {
  return (
    <div
      onClick={() => {
        onClick && onClick();
      }}
      className="overflow-hidden transition-all bg-white rounded-2xl hover:shadow-xl "
    >
      <div
        className="h-56 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGE_BASE_URL}/${item?.image.fileName})`,
        }}
      ></div>
      <div>
        <h4 className="p-5 text-sm">{item?.name}</h4>
        <p className="px-2 py-5 text-2xl text-[#F4511E]">
          ₱ {item?.price}/Hour
        </p>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex flex-col text-sm text-center border-t border-l border-r border-gray-200">
          <FontAwesomeIcon className="text-xl " icon={faBatteryThreeQuarters} />
          Up to 7hrs
        </div>
        <div className="flex items-center justify-center h-full gap-3 text-sm text-center border-t border-l border-r border-gray-200">
          <img src={faDrone} className="w-5 h-5" alt="tdrone" />
        </div>
        <div className="flex flex-col text-sm text-center border-t border-l border-r border-gray-200">
          <FontAwesomeIcon className="text-xl " icon={faGaugeSimpleHigh} />
          100 km/h
        </div>
      </div>
    </div>
  );
};

export default ListCard;
