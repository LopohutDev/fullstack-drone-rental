import React from "react";
import Button from "../../commons/Button";

const Contactus = () => {
  return (
    <div className="p-10 bg-gray-100">
      <div className="p-5 mx-auto bg-white shadow-md max-w-screen-2xl rounded-xl">
        <h1 className="text-3xl font-semibold text-[#F4511E] text-center border-b-2 pb-3 border-[#F4511E]">
          Contact Us
        </h1>
        <div className="flex flex-col gap-5 mt-10">
          <div>
            <label className="text-lg">Subject</label>
            <input
              placeholder="Subject"
              className="w-full px-5 py-3 mt-2 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="text-lg">Message</label>
            <textarea
              placeholder="Type Message Here"
              className="w-full p-5 border border-gray-200 rounded-lg bg-gray-50 h-[400px] mt-2"
            />
          </div>
          <Button className="text-xl">Send Message</Button>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
