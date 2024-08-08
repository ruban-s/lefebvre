"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getWorkersCountByDesignation,
  getWorkersCountByDesignationAndForman,
  getWorkersCountByDesignationAndShift,
  getWorkersCountByShift,
} from "@/data/real_time_dashboard";
import Loading from "@/loading";
import { useDashboardStore } from "@/state";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

interface PropertiesProps1 {
  attendance: string;
}

interface PropertiesProps2 {
  work_type: string;
}

interface PropertiesProps3 {
  attendance: string;
}

interface DashboardDialogProps {
  type: string;
  properties: PropertiesProps1 | PropertiesProps2 | PropertiesProps3;
}

export const DashboardDialog = ({ type, properties }: DashboardDialogProps) => {
  const dashboard = useDashboardStore((state: any) => state.dashboard);
  const [isOpen, setIsOpen] = useState(false);
  // Debugging: Check the values of dashboard and type
  // console.log("Dashboard:", dashboard);
  // console.log("Type:", type);
  // console.log("Properties:", properties);

  const {
    data: dialogWorkersData,
    isLoading: dialogWorkersLoading,
    isError: dialogWorkersError,
    refetch,
  } = useQuery({
    queryKey: ["dashboardDialogWorkersData", type, properties],
    queryFn: async () => {
      if (type === "workers" && "attendance" in properties) {
        const response = await getWorkersCountByDesignation({
          date: dashboard.date,
          attendance:
            properties.attendance === "workers" ? "all" : properties.attendance,
        });
        console.log(response);
        // console.log("Workers Response:", response);
        return response.data;
      } else if (type === "shift" && "work_type" in properties) {
        const response = await getWorkersCountByDesignationAndShift({
          date: dashboard.date,
          shift_type: dashboard.shift_type,
          work_type:
            properties.work_type === "shift" ? "all" : properties.work_type,
        });
        // console.log("Shift Response:", response);
        return response.data;
      } else if (type === "attendance" && "attendance" in properties) {
        const response = await getWorkersCountByDesignationAndForman({
          date: dashboard.date,
          shift_type: dashboard.shift_type,
          attendance:
            properties.attendance.toLowerCase() === "total"
              ? "all"
              : properties.attendance.toLowerCase() === "ot"
              ? "overtime"
              : properties.attendance,
          forman: dashboard.forman,
        });
        // console.log("Attendance Response:", response);
        return response.data;
      }
    },
    enabled: dashboard !== null && type !== null && isOpen,
  });

  const handleOpen = () => {
    setIsOpen(true);
    refetch(); // Manually trigger the query when dialog opens
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        <div className="flex flex-row justify-center items-center">
          <FaEye className="text-gray-500 cursor-pointer" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-full max-h-[500px] overflow-auto">
        {dialogWorkersLoading ? (
          <div className="w-full min-h-[500px] flex justify-center items-center">
            <Loading />
          </div>
        ) : dialogWorkersError ? (
          <div>Error: {dialogWorkersError}</div>
        ) : (
          <div>
            {Object.keys(dialogWorkersData || {}).length === 0 ? (
              <div className="w-full h-full text-red-500 flex justify-center items-center">
                No data available...
              </div>
            ) : (
              <div>
                {Object.entries(dialogWorkersData).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between text-md gap-2 border-b-2 shadow-sm py-3 px-2">
                      <div>
                        <span
                          className={`font-semibold capitalize ${
                            key === "total" ? "text-blue-600" : ""
                          }`}>
                          {key === "total" ? type : key}
                        </span>
                        <span>-</span>
                        <span
                          className={` ${
                            key === "total" ? "text-blue-400" : "text-gray-500"
                          } `}>
                          {JSON.stringify(value)}
                        </span>
                      </div>
                      {key !== "total" && (
                        <div>
                          {type === "workers" && "attendance" in properties && (
                            <Link
                              href={{
                                pathname: `/production/dashboard/worker/${
                                  properties.attendance === "all"
                                    ? "all"
                                    : properties.attendance
                                }`,
                                query: {
                                  designation: key,
                                },
                              }}>
                              <FaChevronDown />
                            </Link>
                          )}
                          {type === "shift" && "work_type" in properties && (
                            <Link
                              href={{
                                pathname: `/production/dashboard/shift/${properties.work_type}`,
                                query: {
                                  designation: key,
                                },
                              }}>
                              <FaChevronDown />
                            </Link>
                          )}
                          {type === "attendance" &&
                            "attendance" in properties && (
                              <Link
                                href={{
                                  pathname: `/production/dashboard/attendance/${properties.attendance}`,
                                  query: {
                                    designation: key,
                                  },
                                }}>
                                <FaChevronDown />
                              </Link>
                            )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
        <AlertDialogFooter className="sticky">
          <AlertDialogCancel className="border-2 border-gray-600 p-2">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
