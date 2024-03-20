"use client";

import LayoutContainer from "@/components/common/layout-container";
import EmployeeFormContainer from "@/components/admin/employee/employeeFormContainer";
import EmployeeListContainer from "@/components/admin/employee/employeeListContainer";
import { UserData } from "@/types";
import { useState } from "react";

const Employee = () => {
  return (
    <LayoutContainer>
      <div className="w-full h-auto ">
        <EmployeeFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <EmployeeListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Employee;
