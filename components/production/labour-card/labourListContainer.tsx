"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { LabourData, ProjectData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { projectColumns } from "./column";
import { getAllLabourCard } from "@/data/labour-card";
import { labourCardMaintanceField, projectController } from "@/config/const";

const LabourListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["labour-card"],
    queryFn: async () => {
      const data = await getAllLabourCard();
      return JSON.parse(data.data) as LabourData[];
    },
  });
  const labours = data;

  if (isError) {
    return <p>error</p>;
  }
  return (
    <div className="w-[100%] h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-theme w-full pl-2 py-2 ">
            <p className="text-lg font-bold text-white ">{"Labour Cards"}</p>
          </div>
          <div className="w-full ">
            <DataTable
              labourCardFields={labourCardMaintanceField}
              columns={projectColumns}
              data={labours!}
              searchName="project_id"
              fileName="Project"
              exportDataFields={projectController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default LabourListContainer;
