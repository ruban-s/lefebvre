"use client";
import EmployeeEfficiencyListContainer from "@/components/production/report/employee_efficiency/employee_efficiencyListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";

const EmployeeEfficiency = () => {
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2 ">
        <EmployeeEfficiencyListContainer />
      </div>
    </LayoutContainer>
  );
};

export default EmployeeEfficiency;
