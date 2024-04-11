"use client";

import Loading from "@/loading";
import { ResourceWorkOdderData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { workOrderListcolumns } from "./column";
import { getAllResourceWorkOrder } from "@/data/resource-work-order";

const WorkOrderResourceListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      return JSON.parse(data.data) as ResourceWorkOdderData[];
    },
  });
  const breaks = data;

  if (isError) {
    return <p>error</p>;
  }
  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"WorkOrders"}</p>
          </div>
          <div className="w-full  ">
            <DataTable
              columns={workOrderListcolumns}
              data={breaks!}
              searchName="resourceId"
              fileName="ResourceWorkOrder"
            />
          </div>
        </>
      )}
    </div>
  );
};
export default WorkOrderResourceListContainer;
