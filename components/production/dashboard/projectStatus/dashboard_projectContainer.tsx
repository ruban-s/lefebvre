"use client";
import { currentDate } from "@/commonfunction";
import { ProjectTableContainerProps } from "@/components/common/dashboard/dashboard_interfac";
import { ReportDataTable } from "@/components/common/report/report-data-table";
import { getReleasedProjectBydateAndStatus } from "@/data/dashboard";
import { getAllProjectByStatus } from "@/data/projects";
import Loading from "@/loading";
import { useDashboardStore } from "@/state";
import { DashbaordProjectData, ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { ProjectColumn } from "./projectColumn";
import {
  AllProjectController,
  ReleasedProjectController,
  unReleasedProjectController,
} from "@/config/dashboardConst";
import { ReleasedProjectColumn } from "./releasedColumn";
import { UnReleasedProjectColumn } from "./unreleasedColumn";

export const DashboardProjectContainer = ({
  project_type,
}: ProjectTableContainerProps) => {
  const type = project_type.toLowerCase();
  const dashboard = useDashboardStore((state: any) => state.dashboard);

  const {
    data: allDashboardProject,
    isLoading: allDashboardProjectLoading,
    isError: allDashboardProjectError,
    refetch: allDashboardProjectRefetch,
  } = useQuery({
    queryKey: ["dashboardAllProject"],
    queryFn: async () => {
      const filterDate =
        dashboard && dashboard.date !== null ? dashboard.date : currentDate();
      const data = await getReleasedProjectBydateAndStatus(filterDate, "All");
      return JSON.parse(data.data) as DashbaordProjectData[];
    },
  });

  const {
    data: releasedDashboardProject,
    isLoading: releasedDashboardProjectLoading,
    isError: releasedDashboardProjectError,
    refetch: releasedDashboardProjectRefetch,
  } = useQuery({
    queryKey: ["dashboardReleasedProject"],
    queryFn: async () => {
      const filterDate =
        dashboard && dashboard.date !== null ? dashboard.date : currentDate();
      const data = await getReleasedProjectBydateAndStatus(
        filterDate,
        "Released"
      );
      return JSON.parse(data.data) as DashbaordProjectData[];
    },
  });

  const {
    data: unreleasedDashboardProject,
    isLoading: unreleasedDashboardProjectLoading,
    isError: unreleasedDashboardProjectError,
    refetch: unreleasedDashboardProjectRefetch,
  } = useQuery({
    queryKey: ["dashboardUnreleasedProject"],
    queryFn: async () => {
      const filterDate =
        dashboard && dashboard.date !== null ? dashboard.date : currentDate();
      const data = await getReleasedProjectBydateAndStatus(
        filterDate,
        "Unreleased"
      );
      return JSON.parse(data.data) as DashbaordProjectData[];
    },
  });

  const onSubmit = useCallback(() => {
    allDashboardProjectRefetch();
    releasedDashboardProjectRefetch();
    unreleasedDashboardProjectRefetch();
  }, [type]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  let data: DashbaordProjectData[],
    loading,
    error,
    columns,
    fileName,
    title,
    exportFields;

  switch (type) {
    case "allproject":
      data = allDashboardProject!;
      loading = allDashboardProjectLoading;
      error = allDashboardProjectError;
      columns = ProjectColumn;
      fileName = "DashboardAllProject";
      title = "All Projects";
      exportFields = AllProjectController;
      break;
    case "releasedproject":
      data = releasedDashboardProject!;
      loading = releasedDashboardProjectLoading;
      error = releasedDashboardProjectError;
      columns = ReleasedProjectColumn;
      fileName = "DashboardReleasedProject";
      title = "Released Projects";
      exportFields = ReleasedProjectController;
      break;
    case "unreleasedproject":
      data = unreleasedDashboardProject!;
      loading = unreleasedDashboardProjectLoading;
      error = unreleasedDashboardProjectError;
      columns = UnReleasedProjectColumn;
      fileName = "DashboardUnreleasedProject";
      title = "Unreleased Projects";
      exportFields = unReleasedProjectController;
      break;
    default:
      data = [];
      loading = false;
      error = false;
      columns = ProjectColumn;
      fileName = "DashboardDefault";
      exportFields = AllProjectController;
  }

  return (
    <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
      {loading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : error ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <p>Error loading data</p>
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">
              {"Dashboard - "}
              {title}
            </p>
          </div>
          <div className="w-full ">
            <ReportDataTable
              data={data!}
              columns={columns}
              searchField={"project_id"}
              placeholder={"project_id"}
              fileName={fileName}
              fullexport={true}
              exportDataFields={exportFields}
            />
          </div>
        </>
      )}
    </div>
  );
};
