"use client";
import EmployeeReportListContainer from "@/components/production/report/employee_report/employee_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";

const EmployeeReport = () => {
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2 ">
        <EmployeeReportListContainer />
      </div>
    </LayoutContainer>
  );
};

export default EmployeeReport;
