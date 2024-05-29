"use client";
import { getWorkOrderReport } from "@/data/report/workorderReport";
import Loading from "@/loading";
import { WorkOrderDataReport } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./column";
import { workOrderDataReportController } from "@/config/const";
import { DateRange } from "react-day-picker";
import { parse, format } from "date-fns";
import { statuses } from "@/types/filter";
import { ReportDataTable } from "@/components/common/report/report-data-table";

interface WorkOrderRepportListContainerProps {
  projectId: string;
}

const WorkOrderReportListContainer = ({
  projectId,
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

  const fetchFullData = async () => {
    const data = await getWorkOrderReport({
      project_id: projectId,
    });
    const responseData = data!.data as WorkOrderDataReport[];
    return responseData;
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
  }, [projectId]);

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
            <ReportDataTable
              columns={columns}
              data={tableData!}
              searchField="work_order_Id"
              filterColumn="status"
              title="Status"
              options={statuses}
              placeholder="Search by WorkOrder Id"
              fileName="WorkOrderReport"
              fullexport={true}
              exportDataFields={workOrderDataReportController}
              setRange={setRange}
              dateRange={dateRange}
              fromDate={fromDate}
              toDate={toDate}
              disabledDates={disabledDates}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WorkOrderReportListContainer;
