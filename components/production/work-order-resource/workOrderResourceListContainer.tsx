"use client";

import Loading from "@/loading";
import { ResourceWorkOdderData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { workOrderListcolumns } from "./column";
import { getAllResourceWorkOrder } from "@/data/resource-work-order";
import { resourceController } from "@/config/const";
import { useEffect, useState } from "react";

const WorkOrderResourceListContainer = () => {
  const [workOrderResourceList, setWorkOrderResources] = useState<
    ResourceWorkOdderData[]
  >([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      const newData = JSON.parse(data.data) as ResourceWorkOdderData[];
      return newData;
    },
  });
  const workOrderResource = data;
  useEffect(() => {
    var filterClosedData = data?.filter((info) => info.status !== "Closed");
    var filterData = filterClosedData?.filter(
      (info) => info.status !== "Canceled"
    );
    if (filterData) {
      setWorkOrderResources(filterData);
    }
  }, [workOrderResource]);

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
            <p className="text-lg font-bold text-white ">
              {"Resource Work Orders"}
            </p>
          </div>
          <div className="w-full  ">
            <DataTable
              columns={workOrderListcolumns}
              data={workOrderResourceList!}
              searchName="resourceId"
              fileName="ResourceWorkOrder"
              exportDataFields={resourceController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default WorkOrderResourceListContainer;