"use client";
import { fetchProjectId, fetchWorkOrderId } from "@/commonfunction";
import ResourceReportFormContainer from "@/components/production/report/resource_report/resource_report_formContainer";
import ResourceReportListContainer from "@/components/production/report/resource_report/resource_report_listContainer";
import LayoutContainer from "@/components/common/layout-container";
import { useEffect, useState } from "react";

const ResourceReport = () => {
  const [filterData, setFilterData] = useState({
    status: "",
    project_id: "",
    work_order_Id: "",
  });

  const [defaultData, setDefaultData] = useState({
    status: "Unreleased",
    project_id: "",
    work_order_Id: "",
  });

  const [workOrderList, setWorkOrderList] = useState<string[]>([]);

  const WorkOrderId = async (project_id: string) => {
    const id = await fetchWorkOrderId(project_id);
    setWorkOrderList(id);
    return id;
  };

  useEffect(() => {
    const ProjectId = async () => {
      const id = await fetchProjectId();
      const firstWorkOrder = await WorkOrderId(id[0].project_id);
      setDefaultData((prevDefault: any) => ({
        ...prevDefault,
        project_id: id[0],
        work_order_Id: firstWorkOrder[0],
      }));
    };
    ProjectId();
  }, []);

  const handleFilterDataChange = (
    status: string,
    project_id: string,
    work_order_Id: string
  ) => {
    setFilterData({
      status: status,
      project_id: project_id,
      work_order_Id: work_order_Id,
    });
  };

  return (
    <LayoutContainer>
      <div className="w-full min-h-[200px] p-2 ">
        <ResourceReportFormContainer
          changeFilterData={handleFilterDataChange}
          defaultData={defaultData}
          workOrderList={workOrderList}
          fetchWorkOrder={WorkOrderId}
        />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <ResourceReportListContainer
          filterData={filterData}
          defaultData={defaultData}
        />
      </div>
    </LayoutContainer>
  );
};

export default ResourceReport;
