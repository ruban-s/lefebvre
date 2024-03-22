"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { AttendanceTypeData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllAttendanceType } from "@/data/attendanceType";

const AttendanceListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const data = await getAllAttendanceType();
      return JSON.parse(data.data) as AttendanceTypeData[];
    },
  });
  const attendanceType = data;

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">
              {"Attendance Types"}
            </p>
          </div>

          <div className="w-full ">
            <DataTable
              columns={columns}
              data={attendanceType!}
              searchName="name"
              fileName="Attendance-Type"
            />
          </div>
        </>
      )}
    </div>
  );
};
export default AttendanceListContainer;