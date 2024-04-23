// "use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { ShiftData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllShift } from "@/data/shift";
import { shiftController } from "@/config/const";

const ShiftListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shift"],
    queryFn: async () => {
      const data = await getAllShift();
      return JSON.parse(data.data) as ShiftData[];
    },
  });
  const breaks = data;

  return (
    <div className="w-[100%] h-auto bg-white  shadow-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Users"}</p>
          </div>
          <div className="w-full  ">
            <DataTable
              columns={columns}
              data={breaks!}
              searchName="name"
              fileName="Users"
              exportDataFields={shiftController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ShiftListContainer;
