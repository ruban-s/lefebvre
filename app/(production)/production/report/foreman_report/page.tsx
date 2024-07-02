"use client";
import {
  fetchFormanList,
  fetchProjectId,
  fetchWorkOrderId,
} from "@/commonfunction";
import BackButton from "@/components/common/back-button";
import LayoutContainer from "@/components/common/layout-container";
import FormanReportFormContainer from "@/components/production/report/forman_report/forman_reportFormContainer";
import FormanReportListContainer from "@/components/production/report/forman_report/forman_reportListContainer";
import { useEffect, useState } from "react";

interface FormanIdProps {
  id: string;
  name: string;
}

const FormanReport = () => {
  const [filterData, setFilterData] = useState({
    status: "",
    project_id: "",
    work_order_Id: "",
    forman_id: "",
  });

  const [defaultData, setDefaultData] = useState({
    status: "Unreleased",
    project_id: "",
    work_order_Id: "",
    forman_id: "",
  });

  const [workOrderList, setWorkOrderList] = useState<string[]>([]);
  const [formanList, setFormanList] = useState<FormanIdProps[]>([]);

  const WorkOrderId = async (project_id: string) => {
    const id = await fetchWorkOrderId(project_id);
    setWorkOrderList(id);
    return id;
  };

  useEffect(() => {
    const ProjectId = async () => {
      const formanList = await fetchFormanList();
      setFormanList(formanList);
      const id = await fetchProjectId();
      const firstWorkOrder =
        id.length > 0 ? await WorkOrderId(id[0].project_id) : "";
      setDefaultData((prevDefault: any) => ({
        ...prevDefault,
        project_id: id[0],
        work_order_Id: firstWorkOrder[0],
        forman_id: formanList[0].id,
      }));
    };
    ProjectId();
  }, []);

  const handleFilterDataChange = (
    status: string,
    project_id: string,
    work_order_Id: string,
    forman_Id: string
  ) => {
    setFilterData({
      status: status,
      project_id: project_id,
      work_order_Id: work_order_Id,
      forman_id: forman_Id,
    });
  };

  return (
    <LayoutContainer>
      <BackButton />
      <div className="w-full min-h-[200px] p-2 ">
        <FormanReportFormContainer
          changeFilterData={handleFilterDataChange}
          defaultData={defaultData}
          workOrderList={workOrderList}
          fetchWorkOrder={WorkOrderId}
          formanList={formanList}
        />
      </div>
      <div className="w-full min-h-[400px] p-2 ">
        <FormanReportListContainer
          filterData={filterData}
          defaultData={defaultData}
        />
      </div>
    </LayoutContainer>
  );
};

export default FormanReport;
