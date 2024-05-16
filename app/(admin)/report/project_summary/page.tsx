"use client";
import ProjectSummaryListContainer from "@/components/admin/report/project_summary/project_summaryListContainer";
import LayoutContainer from "@/components/common/layout-container";

const ProjectSummary = () => {
  return (
    <LayoutContainer>
      <div className="w-full min-h-[400px] p-2 ">
        <ProjectSummaryListContainer />
      </div>
    </LayoutContainer>
  );
};

export default ProjectSummary;
