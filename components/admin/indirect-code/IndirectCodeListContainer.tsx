"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { UserData, IndirectCodeData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllIndirectCodes } from "@/data/indirect-code";

const IndirectCodeListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["indirects"],
    queryFn: async () => {
      const data = await getAllIndirectCodes();
      return JSON.parse(data.data) as IndirectCodeData[];
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
            <p className="text-lg font-semibold pl-4 pt-4">
              {"Indirect-Codes"}
            </p>
          </div>

          <div className="w-full ">
            <DataTable
              columns={columns}
              data={indirects!}
              searchName="indirectCode"
              fileName="Indirect-codes"
            />
          </div>
        </>
      )}
    </div>
  );
};
export default IndirectCodeListContainer;
