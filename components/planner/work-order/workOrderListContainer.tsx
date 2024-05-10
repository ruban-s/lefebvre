"use client";

import Loading from "@/loading";
import { WorkOrderData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { workOrderColumns } from "./column";
import { getAllWorkOrder } from "@/data/work-order";
import { workOrderController } from "@/config/const";
import { useEffect, useState } from "react";

const WorkOrderListContainer = () => {
  const [workOrderList, setWorkOrder] = useState<WorkOrderData[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      const newData = JSON.parse(data.data) as WorkOrderData[];
      return newData;
    },
  });
  const workOrder = data;
  useEffect(() => {
    var filterClosedData = data?.filter((info) => info.status !== "Closed");
    var filterData = filterClosedData?.filter(
      (info) => info.status !== "Canceled"
    );
    if (filterData) {
      setWorkOrder(filterData);
    }
  }, [workOrder]);
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
              columns={workOrderColumns}
              data={workOrderList!}
              searchName="work_order_id"
              fileName="WorkOrder"
              exportDataFields={workOrderController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default WorkOrderListContainer;
