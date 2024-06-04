"use client";
import { getWorkOrderReport } from "@/data/report/workorderReport";
import Loading from "@/loading";
import { WorkOrderDataReport } from "@/types";
import { useEffect, useState } from "react";
import { columns } from "./column";
import { workOrderDataReportController } from "@/config/const";
import { DateRange } from "react-day-picker";
import { parse, format } from "date-fns";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [fullData, setFullData] = useState<WorkOrderDataReport[] | undefined>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [allWorkOrderList, setAllWorkOrderList] = useState<
    WorkOrderDataReport[]
  >([]);
  const [releasedWorkOrderList, setReleasedWorkOrderList] = useState<
    WorkOrderDataReport[]
  >([]);
  const [unReleasedWorkOrderList, setUnReleasedWorkOrderList] = useState<
    WorkOrderDataReport[]
  >([]);
  const [closedWorkOrderList, setClosedWorkOrderList] = useState<
    WorkOrderDataReport[]
  >([]);
  const [cancelledWorkOrderList, setCancelledWorkOrderList] = useState<
    WorkOrderDataReport[]
  >([]);

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
    let filterData: any = tempData;
    if (fromDate && toDate) {
      filterData = tempData.filter((item: any) => {
        const parsedFromDate = parse(item.start_date, "dd-MM-yyyy", new Date());
        const parsedToDate = parse(item.end_date, "dd-MM-yyyy", new Date());
        const formatFromDate = format(new Date(parsedFromDate), "yyyy-MM-dd");
        const formatToDate = format(new Date(parsedToDate), "yyyy-MM-dd");
        return formatFromDate >= fromDate && formatToDate <= toDate;
      });
    } else if (fromDate && !toDate) {
      filterData = tempData.filter((item: any) => {
        const parsedFromDate = parse(item.start_date, "dd-MM-yyyy", new Date());
        const formatFromDate = format(new Date(parsedFromDate), "yyyy-MM-dd");
        return formatFromDate >= fromDate;
      });
    }
    setAllWorkOrderList(filterData);
    setReleasedWorkOrderList(
      filterData.filter((info: any) => info.status === "Released")
    );
    setUnReleasedWorkOrderList(
      filterData.filter((info: any) => info.status === "Unreleased")
    );
    setClosedWorkOrderList(
      filterData.filter((info: any) => info.status === "Closed")
    );
    setCancelledWorkOrderList(
      filterData.filter((info: any) => info.status === "Cancelled")
    );
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
    <div className="w-full w-sm">
      {/* {isLoading ? (
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
      )} */}
      <Tabs defaultValue="all" className="w-full w-sm">
        <TabsList className="bg-theme text-white">
          <TabsTrigger value="all" className="text-sm font-extrabold">
            All
          </TabsTrigger>
          <TabsTrigger
            value="released_project"
            className="text-sm font-extrabold">
            Released Work Order
          </TabsTrigger>
          <TabsTrigger value="unReleased_project">
            Unreleased Work Order
          </TabsTrigger>
          <TabsTrigger value="closed_project">Closed Work Order</TabsTrigger>
          <TabsTrigger value="cancelled_project">
            Cancelled Work Order
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-theme w-full pl-2 py-2 ">
                  <p className="text-lg font-bold text-white ">
                    {"Work Order Report"}
                  </p>
                </div>
                <div className="w-full">
                  <ReportDataTable
                    columns={columns}
                    data={allWorkOrderList!}
                    searchField="work_order_Id"
                    placeholder="Search by WorkOrder Id"
                    fileName="AllWorkOrderReport"
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
        </TabsContent>
        <TabsContent value="released_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-theme w-full pl-2 py-2 ">
                  <p className="text-lg font-bold text-white ">
                    {"Work Order Report"}
                  </p>
                </div>
                <div className="w-full">
                  <ReportDataTable
                    columns={columns}
                    data={releasedWorkOrderList!}
                    searchField="work_order_Id"
                    placeholder="Search by WorkOrder Id"
                    fileName="ReleasedWorkOrderReport"
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
        </TabsContent>
        <TabsContent value="unReleased_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-theme w-full pl-2 py-2 ">
                  <p className="text-lg font-bold text-white ">
                    {"Work Order Report"}
                  </p>
                </div>
                <div className="w-full">
                  <ReportDataTable
                    columns={columns}
                    data={unReleasedWorkOrderList!}
                    searchField="work_order_Id"
                    placeholder="Search by WorkOrder Id"
                    fileName="UnreleasedWorkOrderReport"
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
        </TabsContent>
        <TabsContent value="closed_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-theme w-full pl-2 py-2 ">
                  <p className="text-lg font-bold text-white ">
                    {"Work Order Report"}
                  </p>
                </div>
                <div className="w-full">
                  <ReportDataTable
                    columns={columns}
                    data={closedWorkOrderList!}
                    searchField="work_order_Id"
                    placeholder="Search by WorkOrder Id"
                    fileName="ClosedWorkOrderReport"
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
        </TabsContent>
        <TabsContent value="cancelled_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {isLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <>
                <div className="bg-theme w-full pl-2 py-2 ">
                  <p className="text-lg font-bold text-white ">
                    {"Work Order Report"}
                  </p>
                </div>
                <div className="w-full">
                  <ReportDataTable
                    columns={columns}
                    data={cancelledWorkOrderList!}
                    searchField="work_order_Id"
                    placeholder="Search by WorkOrder Id"
                    fileName="CancelledWorkOrderReport"
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkOrderReportListContainer;
