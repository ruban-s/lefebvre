"use client";
import { DashboardCards } from "@/components/common/dashboard/dashboard_card";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjectByStatus } from "@/data/projects";
import { ProjectData } from "@/types";
import { useDashboardStore } from "@/state";
import Loading from "@/loading";
import {
  getWorkersCount,
  getWorkersCountByForman,
  getWorkersCountByShift,
} from "@/data/real_time_dashboard";
import io from "socket.io-client";

const DashboardStatus = () => {
  //query for all projects
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const {
    data: allProject,
    isLoading: allProjectLoading,
    isError: allProjectError,
    refetch: allProjectRefetch,
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
      return {
        all: releasedCount + unReleasedCount,
        released: releasedCount,
        unReleased: unReleasedCount,
      };
    },
    refetchInterval: 5000, //refetch every five seconds
  });

  //workers count
  const {
    data: workersCount,
    isLoading: workersLoading,
    isError: workersError,
    refetch: workersRefetch,
  } = useQuery({
    queryKey: ["dashboardWorkersCount"],
    queryFn: async () => {
      console.log("Refetching Workers count");
      const data = await getWorkersCount(dashboard.date);
      console.log(data.data);
      return data.data[0];
    },
    refetchInterval: 5000,
    enabled: dashboard !== null && dashboard.date !== null,
  });

  //workers count by shift
  const {
    data: workersShiftCount,
    isLoading: workersShiftLoading,
    isError: workersShiftError,
    refetch: workersShiftRefetch,
  } = useQuery({
    queryKey: ["dashboardWorkersByShiftCount"],
    queryFn: async () => {
      console.log("Refetching Shift count");
      const data = await getWorkersCountByShift({
        date: dashboard.date,
        shift_type: dashboard.shift_type,
      });
      console.log(data.data);
      return data.data[0];
    },
    refetchInterval: 5000,
    enabled:
      dashboard !== null &&
      dashboard.date !== null &&
      dashboard.shift_type !== null,
  });

  //workers count by forman
  const {
    data: workersFormanCount,
    isLoading: workersFormanLoading,
    isError: workersFormanError,
    refetch: workersFormanRefetch,
  } = useQuery({
    queryKey: ["dashboardWorkersByFormanCount"],
    queryFn: async () => {
      console.log("Refetching Forman Count");
      const data = await getWorkersCountByForman({
        date: dashboard.date,
        shift_type: dashboard.shift_type,
        forman: dashboard.forman,
      });
      return data.data[0];
    },
    refetchInterval: 5000,
    enabled:
      dashboard !== null &&
      dashboard.date !== null &&
      dashboard.shift_type !== null &&
      dashboard.forman !== null,
  });

  //project config data
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
        queryType: "allProject",
      },
      {
        keyProps: "Released",
        count: releasedProjectsCount,
        queryType: "releasedProject",
      },
      {
        keyProps: "UnReleased",
        count: unreleasedProjects,
        queryType: "unReleasedProject",
      },
    ],
    barColor: "#0e7490",
    value: releasedPercentage,
    total: `${totalProjects}`,
    emptyColor: "#bae8f4",
    hasShowEye: true,
  };

  // workers config data
  const presentPercentage = workersCount
    ? (workersCount.present / workersCount.total) * 100
    : 0;
  const workersStatus = {
    heading: "Workers",
    data: [
      {
        keyProps: "Vacation",
        count:
          workersCount && workersCount.vacation ? workersCount.vacation : 0,
        queryType: "allProject",
      },
      {
        keyProps: "Workers",
        count: workersCount && workersCount.total ? workersCount.total : 0,
        queryType: "allProject",
      },
      {
        keyProps: "OnDuty",
        count: workersCount && workersCount.present ? workersCount.present : 0,
        queryType: "releasedProject",
      },
      {
        keyProps: "Vacation",
        count: workersCount && workersCount.absent ? workersCount.absent : 0,
        queryType: "unReleasedProject",
      },
    ],
    barColor: "#084d89",
    value: isNaN(presentPercentage) ? 0 : presentPercentage,
    total: `${workersCount && workersCount.total ? workersCount.total : 0}`,
    emptyColor: "#85b5df",
    hasShowEye: false,
  };

  //workersByShift config data
  const shiftPercentage = workersShiftCount
    ? (workersShiftCount.direct / workersShiftCount.total) * 100
    : 0;
  const workersByShiftStatus = {
    heading: "Shift",
    data: [
      {
        keyProps: "Shift",
        count:
          workersShiftCount && workersShiftCount.total ? workersCount.total : 0,
        queryType: "allProject",
      },
      {
        keyProps: "Direct",
        count:
          workersShiftCount && workersShiftCount.direct
            ? workersShiftCount.direct
            : 0,
        queryType: "releasedProject",
      },
      {
        keyProps: "Indirect",
        count:
          workersShiftCount && workersShiftCount.indirect
            ? workersShiftCount.indirect
            : 0,
        queryType: "unReleasedProject",
      },
    ],
    barColor: "#FFA500",
    value: isNaN(shiftPercentage) ? 0 : shiftPercentage,
    total: `${
      workersShiftCount && workersShiftCount.total ? workersCount.total : 0
    }`,
    emptyColor: "#efcb87",
    hasShowEye: false,
  };

  //workersByForman config data
  const attendancePercentage = workersFormanCount
    ? (workersFormanCount.direct / workersFormanCount.total) * 100
    : 0;
  const workersByFormanStatus = {
    heading: "Attendance",
    data: [
      {
        keyProps: "Total",
        count:
          workersFormanCount && workersFormanCount.total
            ? workersFormanCount.total
            : 0,
        queryType: "allProject",
      },
      {
        keyProps: "Present",
        count:
          workersFormanCount && workersFormanCount.present
            ? workersFormanCount.present
            : 0,
        queryType: "releasedProject",
      },
      {
        keyProps: "Absent",
        count:
          workersFormanCount && workersFormanCount.absent
            ? workersFormanCount.absent
            : 0,
        queryType: "unReleasedProject",
      },
      {
        keyProps: "OT",
        count:
          workersFormanCount && workersFormanCount.overtime
            ? workersFormanCount.overtime
            : 0,
        queryType: "unReleasedProject",
      },
    ],
    barColor: "#047821",
    value: isNaN(attendancePercentage) ? 0 : attendancePercentage,
    total: `${
      workersFormanCount && workersFormanCount.total
        ? workersFormanCount.total
        : 0
    }`,
    emptyColor: "#6fc886",
    hasShowEye: false,
  };

  useEffect(() => {
    if (dashboard && dashboard !== null) {
      dashboard.date && allProjectRefetch();
      dashboard.date && workersRefetch();
      dashboard.date && dashboard.shift_type && workersShiftRefetch();
      dashboard.date &&
        dashboard.shift_type &&
        dashboard.forman &&
        workersFormanRefetch();
    }
  }, [dashboard]);

  return (
    <div className="w-full h-full grid grid-cols-4 gap-5">
      <div className="bg-white h-full rounded-md shadow-md">
        {workersLoading ? (
          <div className="w-full h-full">
            <Loading />
          </div>
        ) : (
          <DashboardCards {...workersStatus} />
        )}
      </div>
      <div className="bg-white col-span-2 h-full rounded-md shadow-md flex flex-row justify-between">
        <div className="bg-white w-[48%] h-full rounded-md shadow-md">
          {workersShiftLoading ? (
            <div className="w-full h-full">
              <Loading />
            </div>
          ) : (
            <DashboardCards {...workersByShiftStatus} />
          )}
        </div>
        <div className="h-full w-[1%] bg-gray-300"></div>
        <div className="bg-white w-[48%] h-full rounded-md shadow-md">
          {workersFormanLoading ? (
            <div className="w-full h-full">
              <Loading />
            </div>
          ) : (
            <DashboardCards {...workersByFormanStatus} />
          )}
        </div>
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
