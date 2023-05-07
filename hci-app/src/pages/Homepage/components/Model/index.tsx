import React from "react";
import WeeklyImage from "../../../../assets/weekly.png";
import ChooseImage from "../../../../assets/choose.png";
import HourImage from "../../../../assets/hour.png";
import FlexibleImage from "../../../../assets/flexible.png";

const Model: React.FC = () => {
  return (
    <div className="flex mx-auto my-20 max-w-screen-2xl">
      <div className="flex-1 p-10 text-2xl text-center ">
        <div className="flex flex-wrap items-end gap-5 my-5">
          <div
            className="p-5 bg-green-500 rounded-xl w-[50%] h-80 bg-center bg-cover text-white flex items-center justify-center text-2xl font-medium"
            style={{
              backgroundImage: `url(${FlexibleImage})`,
            }}
          >
            Flexible Leases
          </div>
          <div
            className="p-5 bg-green-500 rounded-xl w-[45%] h-60 bg-center bg-cover text-white flex items-center justify-center text-2xl font-medium"
            style={{
              backgroundImage: `url(${HourImage})`,
            }}
          >
            Hour Long Happiness Guaranteed
          </div>
        </div>
        <div className="flex flex-wrap gap-5 my-5">
          <div
            className="p-5 bg-green-500 rounded-xl w-[40%] h-60 bg-center bg-cover text-white flex items-center justify-center text-2xl font-medium"
            style={{
              backgroundImage: `url(${WeeklyImage})`,
            }}
          >
            Weekly Discounts
          </div>
          <div
            className="p-5 bg-green-500 rounded-xl w-[55%] h-80 bg-center bg-cover text-white flex items-center justify-center text-2xl font-medium"
            style={{
              backgroundImage: `url(${ChooseImage})`,
            }}
          >
            Choose Your Own Drone
          </div>
        </div>
      </div>
      <div className="flex items-center flex-1 ">
        <div className="max-w-lg ">
          <h1 className="text-4xl font-bold">
            Flexibility and options to suit your lifestyle.
          </h1>
          <p className="my-5">
            You need it? We got it. We make your videography easy, comfortable,
            and simple. From our happiness guarantee to our selective drones
            finder option. We provide you the flexibility that you most desire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Model;
