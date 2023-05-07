import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../commons/Button";
import ListCard from "../../../../commons/ListCard";
import { PaginationContainer } from "../../../../commons/PaginationContainer";
import { useGetItemsQuery } from "../../../../services/item.api";

const DroneListing: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [take] = React.useState(3);

  const { data, isLoading } = useGetItemsQuery({
    skip,
    take,
  });

  const handlePageChange = (value: number) => {
    console.log("value", value);
    setPage(value);
  };
  return (
    <div className="bg-gray-100">
      <div className="py-10 mx-auto max-w-screen-2xl">
        <div className="flex justify-between ">
          <Link to="/items" className="text-3xl font-semibold">
            <h1>List Of Drones</h1>
            <hr className="w-[70%] bg-[#F4511E] border-0 h-[1.5px]" />
          </Link>
          <Link to="/items">
            <Button>View All Product</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-10 my-10">
          {data?.data.map((item, i) => (
            <ListCard
              key={i}
              item={item}
              onClick={() => navigate(`items/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroneListing;
