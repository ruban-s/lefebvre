"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { MeasureData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";
import { getAllMeasure } from "@/data/measure";
import { DataTable } from "@/components/common/data-table";

const MeasureListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["measure"],
    queryFn: async () => {
      const data = await getAllMeasure();
      return JSON.parse(data.data) as MeasureData[];
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
            <p className="text-lg font-semibold pl-4 pt-4">{"Measures"}</p>
          </div>
          <div className="h-auto w-[400px] sm:w-[430px] md:w-[600px] lg:w-[900px] xl:w-full p-2 overflow-y-scroll flex flex-col justify-center items-center">
            <DataTable
              columns={columns}
              data={breaks!}
              searchName="Unit"
              fileName="Measures"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default MeasureListContainer;
