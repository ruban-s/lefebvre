"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllUser } from "@/data/user";
interface UserListContainerProps {
  editUser: Function;
}

const UserListContainer = (props: UserListContainerProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getAllUser();
      return JSON.parse(data.data) as UserData[];
    },
  });
  const breaks = data;

  return (
    <div className="w-[100%] h-auto bg-white  shadow-sm">
      {isLoading ? (
        <Loading />
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
            />
          </div>
        </>
      )}
    </div>
  );
};
export default UserListContainer;
