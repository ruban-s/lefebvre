"use client";
import ProjectSummaryListContainer from "@/components/production/report/project_summary/project_summaryListContainer";
import LayoutContainer from "@/components/common/layout-container";
import BackButton from "@/components/common/back-button";

const ProjectSummary = () => {
  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[400px] p-2 ">
        <ProjectSummaryListContainer />
      </div>
    </LayoutContainer>
  );
};

export default ProjectSummary;
