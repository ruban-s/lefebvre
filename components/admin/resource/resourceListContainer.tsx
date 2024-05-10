"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { ResourceData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllResources } from "@/data/resources";
import { resourceAdmincontroller } from "@/config/const";

const ResourceListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["resource"],
    queryFn: async () => {
      const data = await getAllResources();
      return JSON.parse(data.data) as ResourceData[];
    },
  });
  const indirects = data;

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Resources"}</p>
          </div>

          <div className="w-full ">
            <DataTable
              columns={columns}
              data={indirects!}
              searchName="resource_id"
              fileName="Resourece"
              exportDataFields={resourceAdmincontroller}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ResourceListContainer;
