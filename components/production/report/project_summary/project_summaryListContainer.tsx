"use client";
import { DataTable } from "@/components/common/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectSummary } from "@/data/report/projectSummary";
import Loading from "@/loading";
import { ProjectSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";
import { ProjectSummaryController } from "@/config/const";
import { useEffect, useState } from "react";

const ProjectSummaryListContainer = () => {
  const [allProjectList, setAllProjects] = useState<ProjectSummary[]>([]);
  const [releasedProjectList, setReleasedProjects] = useState<ProjectSummary[]>(
    []
  );
  const [unReleasedProjectList, setUnReleasedProjects] = useState<
    ProjectSummary[]
  >([]);
  const [closedProjectList, setClosedProjects] = useState<ProjectSummary[]>([]);
  const [cancelledProjectList, setCancelledProjects] = useState<
    ProjectSummary[]
  >([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectSummary"],
    queryFn: async () => {
      const data = await getProjectSummary("All");
      return data.data as ProjectSummary[];
    },
  });

  const {
    data: allProject,
    isLoading: allLoading,
    error: allProjectError,
  } = useQuery({
    queryKey: ["released-project"],
    queryFn: async () => {
      const data = await getProjectSummary("All");
      return data.data as ProjectSummary[];
    },
  });

  const {
    data: releasedProject,
    isLoading: releasedLoading,
    error: releasedProjectError,
  } = useQuery({
    queryKey: ["released-project"],
    queryFn: async () => {
      const data = await getProjectSummary("Released");
      return data.data as ProjectSummary[];
    },
  });

  const {
    data: unReleasedProject,
    isLoading: unReleasedLoading,
    error: unReleasedProjectError,
  } = useQuery({
    queryKey: ["unReleased-project"],
    queryFn: async () => {
      const data = await getProjectSummary("Unreleased");
      return data.data as ProjectSummary[];
    },
  });

  const {
    data: closedProject,
    isLoading: closedLoading,
    error: closedProjectError,
  } = useQuery({
    queryKey: ["closed-project"],
    queryFn: async () => {
      const data = await getProjectSummary("Closed");
      return data.data as ProjectSummary[];
    },
  });

  const {
    data: cancelledProject,
    isLoading: cancelledLoading,
    error: cancelledProjectError,
  } = useQuery({
    queryKey: ["cancelled-project"],
    queryFn: async () => {
      const data = await getProjectSummary("Cancelled");
      return data.data as ProjectSummary[];
    },
  });

  useEffect(() => {
    if (allProject) {
      setAllProjects(allProject);
    }
    if (releasedProject) {
      setReleasedProjects(
        releasedProject.filter((info) => info.status === "Released")
      );
    }
    if (unReleasedProject) {
      setUnReleasedProjects(
        unReleasedProject.filter((info) => info.status === "Unreleased")
      );
    }
    if (closedProject) {
      setClosedProjects(
        closedProject.filter((info) => info.status === "Closed")
      );
    }
    if (cancelledProject) {
      setCancelledProjects(
        cancelledProject.filter((info) => info.status === "Cancelled")
      );
    }
  }, [releasedProject, unReleasedProject, closedProject, cancelledProject]);

  // const projectSummary = data;
  return (
    <div className="w-full w-sm">
      {/* {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"Project Summary"}</p>
          </div>
          <div className="w-full  ">
            <ReportDataTable
              columns={columns}
              data={projectSummary!}
              searchField="projectId"
              filterColumn="status"
              title="Status"
              options={statuses}
              placeholder="Search by Project Id"
              fileName="ProjectSummary"
              fullexport={true}
              exportDataFields={ProjectSummaryController}
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
            Released Project
          </TabsTrigger>
          <TabsTrigger value="unReleased_project">
            Unreleased Project
          </TabsTrigger>
          <TabsTrigger value="closed_project">Closed Project</TabsTrigger>
          <TabsTrigger value="cancelled_project">Cancelled Project</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {allProjectError || allLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={allProjectList}
                  searchName="project_id"
                  fileName="AllProject"
                  exportDataFields={ProjectSummaryController}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="released_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {releasedProjectError || releasedLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={releasedProjectList}
                  searchName="project_id"
                  fileName="ReleasedProject"
                  exportDataFields={ProjectSummaryController}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="unReleased_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {unReleasedProjectError || unReleasedLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={unReleasedProjectList}
                  searchName="project_id"
                  fileName="UnReleasedProject"
                  exportDataFields={ProjectSummaryController}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="closed_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {closedProjectError || closedLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={closedProjectList}
                  searchName="project_id"
                  fileName="ClosedProject"
                  exportDataFields={ProjectSummaryController}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="cancelled_project">
          <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
            {cancelledProjectError || cancelledLoading ? (
              <div className="w-full min-h-[500px] justify-center items-center flex">
                <Loading />
              </div>
            ) : (
              <div className="w-full">
                <DataTable
                  columns={columns}
                  data={cancelledProjectList}
                  searchName="project_id"
                  fileName="CancelledProject"
                  exportDataFields={ProjectSummaryController}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectSummaryListContainer;
