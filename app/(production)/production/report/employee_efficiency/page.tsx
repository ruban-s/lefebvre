"use client";
import EmployeeEfficiencyListContainer from "@/components/production/report/employee_efficiency/employee_efficiencyListContainer";
import LayoutContainer from "@/components/common/layout-container";

const EmployeeEfficiency = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <EmployeeEfficiencyListContainer />
      </div>
    </LayoutContainer>
  );
};

export default EmployeeEfficiency;
