"use client";
import { DataTable } from "@/components/common/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectController } from "@/config/const";
import { getAllProject } from "@/data/projects";
import Loading from "@/loading";
import { ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Columns } from "./column";

const StatusListContainer = () => {
  const [allProjectList, setAllProjects] = useState<ProjectData[]>([]);
  const [releasedProjectList, setReleasedProjects] = useState<ProjectData[]>(
    []
  );
  const [unReleasedProjectList, setUnReleasedProjects] = useState<
    ProjectData[]
  >([]);
  const [closedProjectList, setClosedProjects] = useState<ProjectData[]>([]);
  const [cancelledProjectList, setCancelledProjects] = useState<ProjectData[]>(
    []
  );

  const { data: allProject, error: allProjectError } = useQuery({
    queryKey: ["released-project"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });

  const { data: releasedProject, error: releasedProjectError } = useQuery({
    queryKey: ["released-project"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });

  const { data: unReleasedProject, error: unReleasedProjectError } = useQuery({
    queryKey: ["unReleased-project"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });

  const { data: closedProject, error: closedProjectError } = useQuery({
    queryKey: ["closed-project"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });

  const { data: cancelledProject, error: cancelledProjectError } = useQuery({
    queryKey: ["cancelled-project"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
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
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {allProjectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={Columns}
                data={allProjectList}
                searchName="project_id"
                fileName="AllProject"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="released_project">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {releasedProjectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={Columns}
                data={releasedProjectList}
                searchName="project_id"
                fileName="ReleasedProject"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="unReleased_project">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {unReleasedProjectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={Columns}
                data={unReleasedProjectList}
                searchName="project_id"
                fileName="UnReleasedProject"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="closed_project">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {closedProjectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={Columns}
                data={closedProjectList}
                searchName="project_id"
                fileName="ClosedProject"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="cancelled_project">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {cancelledProjectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={Columns}
                data={cancelledProjectList}
                searchName="project_id"
                fileName="CancelledProject"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StatusListContainer;
