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
import { DateRange } from "react-day-picker";
import { ReportDataTableWithTimeRange } from "@/components/common/report/report-data-tableWithTimeFilter";
import { parse, format } from "date-fns";

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string | undefined>("");
  const [toDate, setToDate] = useState<string | undefined>("");
  const [tableData, setTableDate] = useState([]);
  const [fullData, setFullData] = useState<WorkOrderDataReport[] | undefined>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const setRange = (date: DateRange | undefined) => {
    setDateRange(date);
    const fromDate = date?.from;
    const toDate = date?.to;
    const formattedFromDate = fromDate
      ? format(new Date(fromDate), "yyyy-MM-dd")
      : "";
    const formattedToDate = toDate
      ? format(new Date(toDate), "yyyy-MM-dd")
      : "";
    setFromDate(formattedFromDate);
    setToDate(formattedToDate);
  };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["work-order-report"],
  //   queryFn: async () => {
  //     if (filterData.status !== "" && filterData.project_id !== "") {
  //       const data = await getWorkOrderReport({
  //         status: filterData.status,
  //         project_id: filterData.project_id,
  //       });
  //       return JSON.parse(data.data) as WorkOrderDataReport[];
  //     }
  //     if (defaultData && defaultData.project_id) {
  //       const data = await getWorkOrderReport({
  //         status: defaultData.status,
  //         project_id: defaultData.project_id.project_id,
  //       });
  //       return JSON.parse(data.data) as WorkOrderDataReport[];
  //     }
  //   },
  // });

  const fetchFullData = async () => {
    if (filterData.status !== "" && filterData.project_id !== "") {
      const data = await getWorkOrderReport({
        status: filterData.status,
        project_id: filterData.project_id,
      });
      return JSON.parse(data.data) as WorkOrderDataReport[];
    } else if (defaultData && defaultData.project_id) {
      const data = await getWorkOrderReport({
        status: defaultData.status,
        project_id: defaultData.project_id.project_id,
      });
      return JSON.parse(data.data) as WorkOrderDataReport[];
    }
  };

  const fetchData = (tempData: any) => {
    if (fromDate && toDate) {
      const filterData = tempData.filter((item: any) => {
        const parsedFromDate = parse(item.start_date, "dd-MM-yyyy", new Date());
        const parsedToDate = parse(item.end_date, "dd-MM-yyyy", new Date());
        const formatFromDate = format(new Date(parsedFromDate), "yyyy-MM-dd");
        const formatToDate = format(new Date(parsedToDate), "yyyy-MM-dd");
        return formatFromDate >= fromDate && formatToDate <= toDate;
      });
      setTableDate(filterData);
      return;
    } else if (fromDate) {
      const filterData = tempData.filter((item: any) => {
        const parsedFromDate = parse(item.start_date, "dd-MM-yyyy", new Date());
        const formatFromDate = format(new Date(parsedFromDate), "yyyy-MM-dd");
        return formatFromDate >= fromDate;
      });
      setTableDate(filterData);
      return;
    }
    setTableDate(tempData);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const WorkOrderReportData = await fetchFullData();
      if (WorkOrderReportData) {
        setFullData(WorkOrderReportData);
      }
    };

    loadData();
  }, [filterData, defaultData]);

  useEffect(() => {
    if (fullData) {
      fetchData(fullData);
      setIsLoading(false);
    }
  }, [fullData, fromDate, toDate]);

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
            <ReportDataTableWithTimeRange
              fullData={fullData!}
              columns={columns}
              data={tableData!}
              setRange={setRange}
              dateRange={dateRange}
              fromDate={fromDate}
              toDate={toDate}
              disabledDates={disabledDates}
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
