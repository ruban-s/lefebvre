"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { WorkOrderData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { workOrderColumns } from "./column";
import { getAllWorkOrder } from "@/data/work-order";
import ProjectListCombo from "../../common/projectListCombo";
import { workOrderController } from "@/config/const";

const WorkOrderListContainer = () => {
  const {
    data: workOrder,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      const newData = JSON.parse(data.data) as WorkOrderData[];
      var filterClosedData = newData.filter((info) => info.status !== "Closed");
      var filterData = filterClosedData.filter(
        (info) => info.status !== "Canceled"
      );
      return filterData;
    },
  });

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
              data={workOrder!}
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
