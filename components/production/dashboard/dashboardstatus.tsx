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
import Loading from "@/loading";

const DashboardStatus = () => {
  //query for all projects
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const {
    data: allProject,
    isLoading: allProjectLoading,
    isError: allProjectError,
  } = useQuery({
    queryKey: ["dashboardProjectCount"],
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
      const releasedCount = parsedReleasedProject.length;
      const unReleasedCount = parsedUnreleasedProject.length;
      // return parsedReleasedProject.concat(
      //   parsedUnreleasedProject
      // ) as ProjectData[];
      return {
        all: releasedCount + unReleasedCount,
        released: releasedCount,
        unReleased: unReleasedCount,
      };
    },
    refetchInterval: 5000, //refetch every five seconds
  });

  //function to send projects
  const setProjects = () => {
    console.log("Setting all projects");
  };

  //function to send released projects
  const setReleasedProjects = () => {
    console.log("Setting released projects");
  };

  //function to send unReleased projects
  const setUnReleasedProjects = () => {
    console.log("Setting UnReleased projects");
  };

  const totalProjects = allProject ? allProject.all : 0;
  const releasedProjectsCount = allProject ? allProject.released : 0;
  const unreleasedProjects = allProject ? allProject.unReleased : 0;
  const releasedPercentage = (releasedProjectsCount / totalProjects) * 100;
  const projectStatus = {
    heading: "Project Status",
    data: [
      {
        keyProps: "Project",
        count: totalProjects,
        onClickFunction: setProjects,
      },
      {
        keyProps: "Released",
        count: releasedProjectsCount,
        onClickFunction: setReleasedProjects,
      },
      {
        keyProps: "UnReleased",
        count: unreleasedProjects,
        onClickFunction: setUnReleasedProjects,
      },
    ],
    barColor: "#0e7490",
    value: releasedPercentage,
    total: `${totalProjects}`,
    emptyColor: "#bae8f4",
  };
  return (
    <div className="w-full h-full grid grid-cols-4 gap-5">
      <div className="bg-white h-full rounded-md shadow-md"></div>
      <div className="bg-white col-span-2 h-full rounded-md shadow-md">
        <div></div>
        <div></div>
      </div>
      <div className="bg-white h-full rounded-md shadow-md">
        {allProjectLoading ? (
          <div className="w-full h-full">
            <Loading />
          </div>
        ) : (
          <DashboardCards {...projectStatus} />
        )}
      </div>
    </div>
  );
};

export default DashboardStatus;
