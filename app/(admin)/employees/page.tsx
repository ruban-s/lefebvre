import LayoutContainer from "@/components/common/layout-container";
import EmployeeFormContainer from "@/components/admin/employee/employeeFormContainer";
import EmployeeListContainer from "@/components/admin/employee/employeeListContainer";
import { UserData } from "@/types";
import { useState } from "react";

const Employee = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <EmployeeFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <EmployeeListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Employee;
