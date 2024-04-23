"use client";

import Loading from "@/loading";
import React, { useEffect, useState } from "react";
import { getAllBreaks } from "@/data/break";
import { EmployeeData, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import CommanCardContainer from "../../common/common-cart";
import { DataTable } from "../../common/data-table";
import { columns } from "./column";
import { getAllEmployee } from "@/data/employee";
import { employeeController } from "@/config/const";

const EmployeeListContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee"],
    queryFn: async () => {
      const data = await getAllEmployee();
      return JSON.parse(data.data) as EmployeeData[];
    },
  });
  const employees = data;
  console.log(employees);

  return (
    <div className="w-full h-auto bg-white  shadow-sm">
      {isLoading ? (
        <div className="w-full min-h-[500px] justify-center items-center flex">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" w-full h-auto ">
            <p className="text-lg font-semibold pl-4 pt-4">{"Employees"}</p>
          </div>

          <div className="w-full ">
            {/* <p>demo</p> */}
            {employees && (
              <DataTable
                columns={columns}
                data={employees!}
                searchName="employee_id"
                fileName="Employee"
                exportDataFields={employeeController}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default EmployeeListContainer;
