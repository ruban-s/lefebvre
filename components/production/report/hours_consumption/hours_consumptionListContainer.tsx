"use client";
import { useEffect } from "react";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { HoursConsumptionReportController } from "@/config/const";
import { getHoursConsumptionReport } from "@/data/report/hoursConsumption";
import Loading from "@/loading";
import { useHoursConsumptionReportStore } from "@/state";
import { HoursConsumptionReport } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Columns } from "./column";
import { currentDate } from "@/commonfunction";

const HoursConsumptionListContainer = () => {
  const queryClient = useQueryClient();

  // Fetch initial state from store
  const hoursConsumption = useHoursConsumptionReportStore(
    (state: any) => state.hoursConsumptionReport
  );
  const setHoursConsumptionReport = useHoursConsumptionReportStore(
    (state: any) => state.setHoursConsumptionReport
  );

  // Default data for query
  const defaultData = {
    consumption: "1-10",
    start_date: currentDate(),
    end_date: currentDate(),
  };

  // Fetch data using react-query
  let { data, isLoading, isError } = useQuery<HoursConsumptionReport[]>({
    queryKey: ["hoursConsumptionReport"],
    queryFn: async () => {
      console.log(isLoading);
      const responseData = await getHoursConsumptionReport({
        ...hoursConsumption,
      });
      const newData = JSON.parse(responseData.data) as HoursConsumptionReport[];
      // console.log(newData);
      return newData;
    },
    enabled: hoursConsumption !== null && hoursConsumption.consumption !== null, // to prevent automaticalyy running
  });

  // Invalidate query on state change
  useEffect(() => {
    // console.log(hoursConsumption);
    if (hoursConsumption === null) {
      setHoursConsumptionReport({ ...defaultData });
    } else {
      queryClient.invalidateQueries({ queryKey: ["hoursConsumptionReport"] });
    }
  }, [hoursConsumption]);

  // Prepare table data
  const tableData = data || [];

  if (isError) {
    return <p className="w-full bg-white px-1 py-2">Data not found</p>;
  }

  return (
    <div className="w-full h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2">
            <p className="text-lg font-bold text-white">
              HoursConsumption Report
            </p>
          </div>
          <div className="w-full">
            <ReportDataTable
              columns={Columns}
              data={tableData}
              searchField="work_order_id"
              placeholder="Search by WorkOrder Id"
              fileName="HoursConsumptionReport"
              fullexport={true}
              exportDataFields={HoursConsumptionReportController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HoursConsumptionListContainer;
