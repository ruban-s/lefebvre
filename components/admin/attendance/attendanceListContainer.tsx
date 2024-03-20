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
  const breaks = data;

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[680px] lg:h-[680px] p-2 overflow-auto ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="rounded-md">
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Attendance"}</p>
          </div>
          <div className="h-auto w-[400px] sm:w-[430px] md:w-[600px] lg:w-[900px] xl:w-full p-2 overflow-y-scroll flex flex-col justify-center items-center">
            <DataTable
              columns={columns}
              data={breaks!}
              searchName="name"
              fileName="Attendance-types"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default AttendanceListContainer;
