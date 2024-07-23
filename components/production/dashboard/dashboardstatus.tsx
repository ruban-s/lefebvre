"use client";
import { DashboardCards } from "@/components/common/dashboard/dashboard_card";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjectByStatus } from "@/data/projects";
import { ProjectData } from "@/types";
import { useDashboardStore } from "@/state";
import { getReleasedProjectBydate } from "@/data/dashboard";
import { currentDate } from "@/commonfunction";
import { FaEye } from "react-icons/fa";

const DashboardStatus = () => {
  //query for all projects
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const {
    data: allProject,
    isLoading: allProjectLoading,
    isError: allProjectError,
  } = useQuery({
    queryKey: ["allProjectCount"],
    queryFn: async () => {
      console.log("Refetching all projects...");
      const releasedProject = await getAllProjectByStatus("Released");
      const unreleasedProject = await getAllProjectByStatus("Unreleased");
      const parsedReleasedProject = JSON.parse(
        releasedProject.data
      ) as ProjectData[];
      const parsedUnreleasedProject = JSON.parse(
        unreleasedProject.data
      ) as ProjectData[];
      return parsedReleasedProject.concat(
        parsedUnreleasedProject
      ) as ProjectData[];
    },
    refetchInterval: 5000, //refetch every five seconds
  });
  //query for released projects
  const {
    data: releasedProject,
    isLoading: releasedProjectLoading,
    isError: releasedProjectError,
  } = useQuery({
    queryKey: ["releasedProjectCount"],
    queryFn: async () => {
      console.log("Refetching released projects...");
      const date =
        dashboard && dashboard.date !== null ? dashboard.date : currentDate();
      const releasedProject = await getReleasedProjectBydate(date);
      return JSON.parse(releasedProject.data) as ProjectData[];
    },
    refetchInterval: 5000, //refetch every five seconds
  });
  const totalProjects = allProject ? allProject.length : 0;
  const releasedProjectsCount = releasedProject ? releasedProject.length : 0;
  const unreleasedProjects = allProject
    ? allProject.filter((project) => project.status === "Unreleased").length
    : 0;
  const projectStatus = {
    heading: "Project Status",
    data: [
      {
        keyProps: "Project",
        count: totalProjects,
      },
      {
        keyProps: "Released",
        count: releasedProjectsCount,
      },
      {
        keyProps: "UnReleased",
        count: unreleasedProjects,
      },
    ],
    color: "#0e7490",
  };
  return (
    <div className="w-full h-full grid grid-cols-4 gap-5">
      <div className="bg-white h-full rounded-md shadow-md"></div>
      <div className="bg-white col-span-2 h-full rounded-md shadow-md">
        <div></div>
        <div></div>
      </div>
      <div className="bg-white h-full rounded-md shadow-md">
        <DashboardCards {...projectStatus} />
      </div>
    </div>
  );
};

export default DashboardStatus;
