"use client";
import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import DashboardShiftContainer from "@/components/production/dashboard/shiftStatus/dashboardShiftContainer";
import { useSearchParams } from "next/navigation";

export default function DashboardData({ params }: { params: any }) {
  const searchParams = useSearchParams();
  const designation = searchParams.get("designation");
  const type = params.type;
  console.log(type);
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2">
        <DashboardShiftContainer
          work_type={type}
          designation={designation ? designation : "welder"}
        />
      </div>
    </LayoutContainer>
  );
}
