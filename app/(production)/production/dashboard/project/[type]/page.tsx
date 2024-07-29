"use client";
import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import { DashboardProjectContainer } from "@/components/production/dashboard/projectStatus/dashboard_projectContainer";

export default function DashboardData({ params }: { params: any }) {
  const type = params.type;
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2">
        <DashboardProjectContainer project_type={type} />
      </div>
    </LayoutContainer>
  );
}
