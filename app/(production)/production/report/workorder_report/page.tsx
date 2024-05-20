"use client";
import { fetchProjectId } from "@/commonfunction";
import WorkOrderReportFormContainer from "@/components/production/report/workorder_report/workorder_reportFormContainer";
import WorkOrderReportListContainer from "@/components/production/report/workorder_report/workorder_reportListContainer";
import LayoutContainer from "@/components/common/layout-container";
import { useEffect, useState } from "react";

const WorkOrderReport = () => {
  const [filterData, setFilterData] = useState({
    status: "",
    project_id: "",
  });

  const [defaultData, setDefaultData] = useState({
    status: "Unreleased",
    project_id: "",
  });

  useEffect(() => {
    const ProjectId = async () => {
      const id = await fetchProjectId();
      setDefaultData((prevDefault: any) => ({
        ...prevDefault,
        project_id: id[0],
      }));
    };
    ProjectId();
  }, []);

  const handleFilterDataChange = (status: string, project_id: string) => {
    setFilterData({
      status: status,
      project_id: project_id,
    });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <WorkOrderReportFormContainer
          changeFilterData={handleFilterDataChange}
          defaultData={defaultData}
        />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <WorkOrderReportListContainer
          filterData={filterData}
          defaultData={defaultData}
        />
      </div>
    </LayoutContainer>
  );
};

export default WorkOrderReport;
