"use client";
import Loading from "@/loading";
import { ResourceReport } from "@/types";
import { useEffect, useState } from "react";
import { Columns } from "./column";
import { ResourceReportController } from "@/config/const";
import { DateRange } from "react-day-picker";
import { ReportDataTableWithTimeRange } from "@/components/common/report/report-data-tableWithTimeFilter";
import { parse, format } from "date-fns";
import { getResourceReport } from "@/data/report/resourceReport";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { statuses } from "@/types/filter";

interface ResourceReportListContainerProps {
  projectId: string;
  workOrderId: string;
}

const ResourceReportContainer = ({
  projectId,
  workOrderId,
}: ResourceReportListContainerProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDates, setDisbleDates] = useState<Date[]>([]);
  const [fromDate, setFromDate] = useState<string | undefined>("");
  const [toDate, setToDate] = useState<string | undefined>("");
  const [tableData, setTableDate] = useState<ResourceReport[] | undefined>([]);
  const [fullData, setFullData] = useState<ResourceReport[] | undefined>();
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
    const data = await getResourceReport({
      project_id: projectId,
      work_order_Id: workOrderId,
    });
    const responseData = data!.data as ResourceReport[];
    setTableDate(responseData);
    setFullData(responseData);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchFullData();
    };
    loadData();
  }, [projectId, workOrderId]);

  return (
    <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"ResourceReport"}</p>
          </div>
          <div className="w-full ">
            <ReportDataTable
              columns={Columns}
              data={tableData!}
              searchField="resource_id"
              filterColumn="status"
              title="Status"
              options={statuses}
              placeholder="Search by Resource Id"
              fileName="ResourceReport"
              fullexport={true}
              exportDataFields={ResourceReportController}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ResourceReportContainer;
