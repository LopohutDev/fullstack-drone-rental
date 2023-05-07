import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../commons/Loading";
import { itemApi, useGetItemQuery } from "../../../services/item.api";

const SelectedItem: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetItemQuery(id || "");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto my-10 max-w-screen-2xl">
      <Link
        to="/items"
        className="flex items-center gap-5 text-2xl text-[#F4511E]"
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="text-3xl" />
        Back to Listing
      </Link>
      <div className="flex gap-5 mt-5">
        <div
          className="w-[50%] h-[500px]  bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_IMAGE_BASE_URL}/${data?.image.fileName})`,
          }}
        ></div>
        <div className="w-[50%]">
          <h1 className="text-3xl font-semibold">{data?.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            </div>
            4.9
            <span>(1 reviews)</span>
          </div>
          <div className="mt-2">
            <p className="text-xl font-mediumn ">Description:</p>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedItem;
