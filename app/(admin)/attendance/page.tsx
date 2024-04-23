import AttendanceFormContainer from "@/components/admin/attendance/attendanceFormContainer";
import AttendanceListContainer from "@/components/admin/attendance/attendanceListContainer";
import LayoutContainer from "@/components/common/layout-container";

const Measures = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <AttendanceFormContainer />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <AttendanceListContainer />
      </div>
    </LayoutContainer>
  );
};

export default Measures;
