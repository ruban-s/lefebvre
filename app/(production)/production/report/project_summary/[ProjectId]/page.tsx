"use client";
import WorkOrderReportListContainer from "@/components/production/report/workorder_report/workorder_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";
import { useSearchParams } from "next/navigation";
import ResourceReportContainer from "@/components/production/report/resource_report/resource_report_listContainer";

export default function WorkOrderId({ params }: { params: any }) {
  const searchParams = useSearchParams();
  const work_order_id = searchParams.get("work_order_id");
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2 ">
        <WorkOrderReportListContainer projectId={params.ProjectId} />
        {work_order_id && (
          <ResourceReportContainer
            projectId={params.ProjectId}
            workOrderId={work_order_id}
          />
        )}
      </div>
    </LayoutContainer>
  );
}
