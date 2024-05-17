"use client";
import { DataTable } from "@/components/common/data-table";
import { getWorkOrderReport } from "@/data/report/workorderReport";
import Loading from "@/loading";
import { WorkOrderDataReport } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { columns } from "./column";
import { workOrderDataReportController } from "@/config/const";
import { Button } from "@/components/ui/button";

interface WorkOrderRepportListContainerProps {
  filterData: {
    status: string;
    project_id: string;
  };
  defaultData: {
    status: string;
    project_id: any;
  };
}

const WorkOrderReportListContainer = ({
  filterData,
  defaultData,
}: WorkOrderRepportListContainerProps) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["work-order-report"],
    queryFn: async () => {
      if (filterData.status !== "" && filterData.project_id !== "") {
        const data = await getWorkOrderReport({
          status: filterData.status,
          project_id: filterData.project_id,
        });
        return JSON.parse(data.data) as WorkOrderDataReport[];
      }
      if (defaultData && defaultData.project_id) {
        const data = await getWorkOrderReport({
          status: defaultData.status,
          project_id: defaultData.project_id.project_id,
        });
        return JSON.parse(data.data) as WorkOrderDataReport[];
      }
    },
  });
  const workOrderReport = data;

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["work-order-report"] });
  }, [filterData, defaultData]);

  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"WorkOrderReport"}</p>
          </div>
          <div className="w-full ">
            <DataTable
              columns={columns}
              data={workOrderReport!}
              searchName="project_id"
              fileName="WorkOrderReport"
              exportDataFields={workOrderDataReportController}
              fullexport={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WorkOrderReportListContainer;
