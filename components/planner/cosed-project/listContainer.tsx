"use client";

import Loading from "@/loading";
import { WorkOrderData, ProjectData, ResourceWorkOdderData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { getAllWorkOrder, getAllWorkOrderByStatus } from "@/data/work-order";
import ProjectListCombo from "../../common/projectListCombo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProject, getAllProjectByStatus } from "@/data/projects";
import { workOrderColumns } from "./workOrderColumn";
import { projectColumns } from "./projectColumn";
import { workOrderListcolumns } from "./resourceWorkOrderColumn";
import {
  getAllResourceWorkOrder,
  getAllResourceWorkOrderByStatus,
} from "@/data/resource-work-order";
import { useState, useEffect } from "react";
import {
  projectController,
  resourceController,
  workOrderController,
} from "@/config/const";

const ClosedProject = () => {
  const [workOrderList, setWorkOrders] = useState<WorkOrderData[]>([]);
  const [projectList, setProjects] = useState<ProjectData[]>([]);
  const [resourceWorkOrderList, setResourceWorkOrders] = useState<
    ResourceWorkOdderData[]
  >([]);

  const { data: workOrders, error: workOrderError } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data: any = await getAllWorkOrder();
      const newWorkOrderData = JSON.parse(data.data) as WorkOrderData[];
      setWorkOrders(
        newWorkOrderData.filter((info, index) => info.status === "Closed")
      );
      return JSON.parse(data.data) as WorkOrderData[];
    },
  });
  const { data: projects, error: projectError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      const newProject = JSON.parse(data.data) as ProjectData[];
      setProjects(newProject.filter((info, index) => info.status === "Closed"));
      return JSON.parse(data.data) as ProjectData[];
    },
  });
  const { data: resourceWorkOrder, isError: resourceError } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      const newResourceData = JSON.parse(data.data) as ResourceWorkOdderData[];
      setResourceWorkOrders(
        newResourceData.filter((info, index) => info.status === "Closed")
      );
      return JSON.parse(data.data) as ResourceWorkOdderData[];
    },
  });
  useEffect(() => {
    projects &&
      setProjects(projects.filter((info, index) => info.status === "Closed"));
    workOrders &&
      setWorkOrders(
        workOrders.filter((info, index) => info.status === "Closed")
      );
    resourceWorkOrder &&
      setResourceWorkOrders(
        resourceWorkOrder.filter((info, index) => info.status === "Closed")
      );
  }, []);
  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="bg-theme text-white">
        <TabsTrigger value="project">Closed Project</TabsTrigger>
        <TabsTrigger value="workOrder">Closed Work Order</TabsTrigger>
        <TabsTrigger value="resource">Closed Work Order Resource</TabsTrigger>
      </TabsList>
      <TabsContent value="project">
        <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
          {projectError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-full  ">
                <DataTable
                  columns={projectColumns}
                  data={projectList!}
                  searchName="project_id"
                  fileName="Project"
                  exportDataFields={projectController}
                />
              </div>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="workOrder">
        <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
          {workOrderError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-full  ">
                <DataTable
                  columns={workOrderColumns}
                  data={workOrderList!}
                  searchName="work_order_id"
                  fileName="WorkOrder"
                  exportDataFields={workOrderController}
                />
              </div>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="resource">
        <div className="w-[100%]  h-auto bg-white  ring-1 ring-theme shadow-sm rounded-sm">
          {resourceError ? (
            <div className="w-full min-h-[500px] justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <>
              <div className="w-full  ">
                <DataTable
                  columns={workOrderListcolumns}
                  data={resourceWorkOrderList!}
                  searchName="resourceId"
                  fileName="ResourceWorkOrder"
                  exportDataFields={resourceController}
                />
              </div>
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
export default ClosedProject;
