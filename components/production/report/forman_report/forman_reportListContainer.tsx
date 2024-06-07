"use client";
import Loading from "@/loading";
import { FormanReport } from "@/types";
import { useEffect, useState } from "react";
import { Columns } from "./column";
import { FormanReportController } from "@/config/const";
import { DateRange } from "react-day-picker";
import { ReportDataTableWithTimeRange } from "@/components/common/report/report-data-tableWithTimeFilter";
import { parse, format } from "date-fns";
import { getFormanReport } from "@/data/report/formanReport";

interface FormanReportListContainerProps {
  filterData: {
    status: string;
    project_id: string;
    work_order_Id: string;
    forman_id: string;
  };
  defaultData: {
    status: string;
    project_id: any;
    work_order_Id: string;
    forman_id: string;
  };
}

const FormanReportListContainer = ({
  filterData,
  defaultData,
}: FormanReportListContainerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string | undefined>("");
  const [toDate, setToDate] = useState<string | undefined>("");
  const [tableData, setTableDate] = useState<FormanReport[] | undefined>([]);
  const [fullData, setFullData] = useState<FormanReport[] | undefined>();
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

  const fetchFullData = async () => {
    if (
      filterData.status !== "" &&
      filterData.project_id !== "" &&
      filterData.work_order_Id !== "" &&
      filterData.forman_id !== ""
    ) {
      if (
        filterData.status !== undefined &&
        filterData.project_id !== undefined &&
        filterData.work_order_Id !== undefined &&
        filterData.forman_id !== undefined
      ) {
        const data = await getFormanReport({
          resource_status: filterData.status,
          project_id: filterData.project_id,
          work_order_id: filterData.work_order_Id,
          forman_id: filterData.forman_id,
        });
        const parsedData = JSON.parse(data.data) as FormanReport[];
        setTableDate(parsedData);
        setFullData(parsedData);
        setIsLoading(false);
        return;
      }
    } else if (
      defaultData.status != "" &&
      defaultData.project_id != "" &&
      defaultData.work_order_Id != "" &&
      defaultData.forman_id != ""
    ) {
      if (
        defaultData.status != undefined &&
        defaultData.project_id != undefined &&
        defaultData.work_order_Id != undefined &&
        defaultData.forman_id != undefined
      ) {
        const data = await getFormanReport({
          resource_status: defaultData.status,
          project_id: defaultData.project_id.project_id,
          work_order_id: defaultData.work_order_Id,
          forman_id: defaultData.forman_id,
        });
        const parsedData = JSON.parse(data.data) as FormanReport[];
        setTableDate(parsedData);
        setFullData(parsedData);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchFullData();
    };
    loadData();
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
            <p className="text-lg font-bold text-white ">{"ForemanReport"}</p>
          </div>
          <div className="w-full ">
            <ReportDataTableWithTimeRange
              fullData={fullData!}
              columns={Columns}
              data={tableData!}
              setRange={setRange}
              dateRange={dateRange}
              fromDate={fromDate}
              toDate={toDate}
              disabledDates={disabledDates}
              searchName="project_id"
              fileName="FormanReport"
              exportDataFields={FormanReportController}
              fullexport={true}
              disableDateTime={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FormanReportListContainer;
