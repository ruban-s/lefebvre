"use client";
import EmployeeReportListContainer from "@/components/production/report/employee_report/employee_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";
import Image from "next/image";

const EmployeeReport = () => {
  // return (
  //   <LayoutContainer>
  //     <BackButton />
  //     <div className="w-full min-h-[400px] p-2 ">
  //       <EmployeeReportListContainer />
  //     </div>
  //   </LayoutContainer>
  // );
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[10%]">
        <BackButton />
      </div>
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="w-[150px] h-150px">
          <Image
            src="/bg-waiting.jpeg"
            width={200}
            height={200}
            alt="LEFEBVRE"
            className="object-contain rounded-lg  "
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
