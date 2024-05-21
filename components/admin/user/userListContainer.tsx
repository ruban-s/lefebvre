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
import { userController } from "@/config/const";
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

  if (isError) {
    return <p className="w-full bg-white px-1 py-2">Data not found</p>;
  }

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
              exportDataFields={userController}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default UserListContainer;
