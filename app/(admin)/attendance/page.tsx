"use client";

import AttendanceFormContainer from "@/components/admin/attendance/attendanceFormContainer";
import AttendanceListContainer from "@/components/admin/attendance/attendanceListContainer";
import LayoutContainer from "@/components/common/layout-container";

const Measures = () => {
  return (
    <LayoutContainer>
      <div className="w-full h-auto ">
        <AttendanceFormContainer />
      </div>
      <div className="flex-1 w-[99%] mb-1 justify-center items-center flex bg-white rounded-lg shadow-md ">
        <AttendanceListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Measures;
