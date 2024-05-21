"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { ProjectData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { projectColumns } from "./column";
import { getAllProject } from "@/data/projects";
import { projectController } from "@/config/const";

const ProjectListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      return JSON.parse(data.data) as ProjectData[];
    },
  });
  const breaks = data;

  if (isError) {
    return <p className="w-full bg-white px-1 py-2">Data not found</p>;
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
            <p className="text-lg font-bold text-white ">{"Projects"}</p>
          </div>
          <div className="w-full  ">
            <DataTable
              columns={projectColumns}
              data={breaks!}
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
export default ProjectListContainer;
