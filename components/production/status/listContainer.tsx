"use client";
import { DataTable } from "@/components/common/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectController } from "@/config/const";
import { getAllProject } from "@/data/projects";
import Loading from "@/loading";
import { ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Columns } from "./column";

const StatusListContainer = () => {
  const {
    data: allProjects,
    isLoading: isAllProjectsLoading,
    error: allProjectsError,
  } = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });

  const {
    data: releasedProjects,
    isLoading: isReleasedProjectsLoading,
    error: releasedProjectsError,
  } = useQuery({
    queryKey: ["released-projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return (JSON.parse(data.data) as ProjectData[]).filter(
        (info) => info.status === "Released"
      );
    },
  });

  const {
    data: unreleasedProjects,
    isLoading: isUnreleasedProjectsLoading,
    error: unreleasedProjectsError,
  } = useQuery({
    queryKey: ["unreleased-projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return (JSON.parse(data.data) as ProjectData[]).filter(
        (info) => info.status === "Unreleased"
      );
    },
  });

  const {
    data: closedProjects,
    isLoading: isClosedProjectsLoading,
    error: closedProjectsError,
  } = useQuery({
    queryKey: ["closed-projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return (JSON.parse(data.data) as ProjectData[]).filter(
        (info) => info.status === "Closed"
      );
    },
  });

  const {
    data: cancelledProjects,
    isLoading: isCancelledProjectsLoading,
    error: cancelledProjectsError,
  } = useQuery({
    queryKey: ["cancelled-projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return (JSON.parse(data.data) as ProjectData[]).filter(
        (info) => info.status === "Cancelled" || info.status === "Canceled"
      );
    },
  });

  const renderDataTable = (
    data: any,
    isLoading: any,
    error: any,
    fileName: any
  ) => (
    <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : error ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <p>Error loading data</p>
        </div>
      ) : (
        <div className="w-full">
          <DataTable
            columns={Columns}
            data={data || []}
            searchName="project_id"
            fileName={fileName}
            exportDataFields={projectController}
          />
        </div>
      )}
    </div>
  );

  return (
    <Tabs defaultValue="all" className="w-full w-sm">
      <TabsList className="bg-theme text-white">
        <TabsTrigger value="all" className="text-sm font-extrabold">
          All
        </TabsTrigger>
        <TabsTrigger
          value="released_project"
          className="text-sm font-extrabold">
          Released Project
        </TabsTrigger>
        <TabsTrigger value="unReleased_project">Unreleased Project</TabsTrigger>
        <TabsTrigger value="closed_project">Closed Project</TabsTrigger>
        <TabsTrigger value="cancelled_project">Cancelled Project</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {renderDataTable(
          allProjects,
          isAllProjectsLoading,
          allProjectsError,
          "AllProject"
        )}
      </TabsContent>
      <TabsContent value="released_project">
        {renderDataTable(
          releasedProjects,
          isReleasedProjectsLoading,
          releasedProjectsError,
          "ReleasedProject"
        )}
      </TabsContent>
      <TabsContent value="unReleased_project">
        {renderDataTable(
          unreleasedProjects,
          isUnreleasedProjectsLoading,
          unreleasedProjectsError,
          "UnreleasedProject"
        )}
      </TabsContent>
      <TabsContent value="closed_project">
        {renderDataTable(
          closedProjects,
          isClosedProjectsLoading,
          closedProjectsError,
          "ClosedProject"
        )}
      </TabsContent>
      <TabsContent value="cancelled_project">
        {renderDataTable(
          cancelledProjects,
          isCancelledProjectsLoading,
          cancelledProjectsError,
          "CancelledProject"
        )}
      </TabsContent>
    </Tabs>
  );
};

export default StatusListContainer;
