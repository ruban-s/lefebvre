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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/common/data-table";

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

  const [allResourceReport, setAllResourceReports] = useState<ResourceReport[]>(
    []
  );
  const [releasedResourceReport, setReleasedResourceReports] = useState<
    ResourceReport[]
  >([]);
  const [unReleasedResourceReport, setUnReleasedResourceReports] = useState<
    ResourceReport[]
  >([]);
  const [closedResourceReport, setClosedResourceReports] = useState<
    ResourceReport[]
  >([]);
  const [cancelledResourceReport, setCancelledResourceReports] = useState<
    ResourceReport[]
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

  const fetchFullData = async () => {
    const data = await getResourceReport({
      project_id: projectId,
      work_order_Id: workOrderId,
    });
    const responseData = data!.data as ResourceReport[];
    setTableDate(responseData);
    setFullData(responseData);
    setAllResourceReports(responseData);
    setReleasedResourceReports(
      responseData.filter((info: any) => info.status === "Released")
    );
    setUnReleasedResourceReports(
      responseData.filter((info: any) => info.status === "Unreleased")
    );
    setClosedResourceReports(
      responseData.filter((info: any) => info.status === "Closed")
    );
    setCancelledResourceReports(
      responseData.filter((info: any) => info.status === "Cancelled")
    );
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
    <div className="w-full w-sm">
      {/* {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"Resource Report"}</p>
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
      )} */}
      <Tabs defaultValue="all" className="w-full w-sm">
        <TabsList className="bg-theme text-white">
          <TabsTrigger value="all" className="text-sm font-extrabold">
            All
          </TabsTrigger>
          <TabsTrigger
            value="released_project"
            className="text-sm font-extrabold">
            Released Resource
          </TabsTrigger>
          <TabsTrigger value="unReleased_project">
            Unreleased Resource
          </TabsTrigger>
          <TabsTrigger value="closed_project">Closed Resource</TabsTrigger>
          <TabsTrigger value="cancelled_project">
            Cancelled Resource
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
                    {"Resource Report"}
                  </p>
                </div>
                <div className="w-full">
                  <DataTable
                    columns={Columns}
                    data={allResourceReport}
                    searchName="resource_id"
                    fileName="AllResourceId"
                    exportDataFields={ResourceReportController}
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
                    {"Resource Report"}
                  </p>
                </div>
                <div className="w-full">
                  <DataTable
                    columns={Columns}
                    data={releasedResourceReport}
                    searchName="resource_id"
                    fileName="ReleasedResourceId"
                    exportDataFields={ResourceReportController}
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
                    {"Resource Report"}
                  </p>
                </div>
                <div className="w-full">
                  <DataTable
                    columns={Columns}
                    data={unReleasedResourceReport}
                    searchName="resource_id"
                    fileName="UnReleasedResourceId"
                    exportDataFields={ResourceReportController}
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
                    {"Resource Report"}
                  </p>
                </div>
                <div className="w-full">
                  <DataTable
                    columns={Columns}
                    data={closedResourceReport}
                    searchName="resource_id"
                    fileName="ClosedResourceId"
                    exportDataFields={ResourceReportController}
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
                    {"Resource Report"}
                  </p>
                </div>
                <div className="w-full">
                  <DataTable
                    columns={Columns}
                    data={cancelledResourceReport}
                    searchName="resource_id"
                    fileName="CancelledResourceId"
                    exportDataFields={ResourceReportController}
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

export default ResourceReportContainer;
