"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { ResourceData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllResources } from "@/data/resources";

const ResourceListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["resource"],
    queryFn: async () => {
      const data = await getAllResources();
      return JSON.parse(data.data) as ResourceData[];
    },
  });
  const breaks = data;

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[680px] lg:h-[680px] p-2 ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="rounded-md">
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Resources"}</p>
          </div>
          <div className="h-auto w-[400px] sm:w-[430px] md:w-[600px] lg:w-[900px] xl:w-full p-2 overflow-auto">
            <DataTable
              columns={columns}
              data={breaks!}
              searchName="name"
              fileName="Resource"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ResourceListContainer;
