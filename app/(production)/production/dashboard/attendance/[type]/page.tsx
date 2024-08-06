"use client";
import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import DashboardAttendanceContainer from "@/components/production/dashboard/attendanceStatus/dashboard_attendanceContainer";
import { DashboardProjectContainer } from "@/components/production/dashboard/projectStatus/dashboard_projectContainer";
import DashboardWorkerContainer from "@/components/production/dashboard/workersStatus/dashboard_workerContainer";
import { useSearchParams } from "next/navigation";

export default function DashboardData({ params }: { params: any }) {
  const searchParams = useSearchParams();
  const designation = searchParams.get("designation");
  const type = params.type;
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2">
        <DashboardAttendanceContainer
          attendance={type}
          designation={designation ? designation : "welder"}
        />
      </div>
    </LayoutContainer>
  );
}
