"use client";

import { getCurrentDate } from "@/commonfunction";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { getWorkersByDesignation } from "@/data/real_time_dashboard";
import Loading from "@/loading";
import { useDashboardStore } from "@/state";
import { DashboardWorkersData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./workersColumn";
import { DashboardWorkersController } from "@/config/dashboardConst";
import { useEffect } from "react";

interface DashboardWorkerContainerProps {
  attendance: string;
  designation: string;
}

const DashboardWorkerContainer = ({
  attendance,
  designation,
}: DashboardWorkerContainerProps) => {
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboardWorkers"],
    queryFn: async () => {
      const date =
        dashboard && dashboard.date ? dashboard.date : getCurrentDate();
      const response = await getWorkersByDesignation({
        date,
        attendance,
        designation,
      });
      // console.log(response.data);
      return response.data as DashboardWorkersData[];
    },
  });

  useEffect(() => {
    refetch();
  }, [attendance, designation]);

  return (
    <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : isError ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <p>Error loading data</p>
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">
              {"Dashboard - "}
              {"Workers"}
            </p>
          </div>
          <div className="w-full ">
            <ReportDataTable
              data={data!}
              columns={columns}
              searchField={"employee_id"}
              placeholder={"employee_id"}
              fileName={`DashboardWorkes_${attendance}`}
              fullexport={true}
              exportDataFields={DashboardWorkersController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardWorkerContainer;
