"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { MeasureData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column";
import { getAllMeasure } from "@/data/measure";
import { DataTable } from "@/components/common/data-table";
import { measuresController } from "@/config/const";

const MeasureListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["measure"],
    queryFn: async () => {
      try {
        const data = await getAllMeasure();
        return JSON.parse(data.data) as MeasureData[];
      } catch (error) {
        // Handle error appropriately
        console.error("Error fetching measures:", error);
        return [];
      }
    },
  });
  const measures = data || [];

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Measures"}</p>
          </div>

          <div className="w-full ">
            <DataTable
              columns={columns}
              data={measures}
              searchName="unit"
              fileName="Measure"
              exportDataFields={measuresController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default MeasureListContainer;
