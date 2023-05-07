import React from "react";
import { useNavigate } from "react-router-dom";
import ListCard from "../../commons/ListCard";
import Loading from "../../commons/Loading";
import { PaginationContainer } from "../../commons/PaginationContainer";
import { useGetItemsQuery } from "../../services/item.api";

const Items: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [skip, setSkip] = React.useState(0);
  const [take] = React.useState(6);
  const { data, isLoading } = useGetItemsQuery({
    skip,
    take,
  });

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  React.useEffect(() => {
    setSkip((page - 1) * take);
  }, [page, take]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-gray-100">
      <div className="mx-auto max-w-screen-2xl">
        <div className="text-3xl font-semibold">
          <h1>List Of Drones</h1>
        </div>
        <PaginationContainer
          totalCount={data?.count || 0}
          currentPage={page}
          pageSize={take}
          onPageChange={handlePageChange}
          label="Drone"
        >
          <div className="grid grid-cols-3 gap-10 my-10">
            {data?.data.map((item, i) => (
              <ListCard key={i} item={item} onClick={() => navigate(item.id)} />
            ))}
          </div>
        </PaginationContainer>
      </div>
    </div>
  );
};

export default Items;

export { default as SelectedItem } from "./SelectedItem";
