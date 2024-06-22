"use client";

import Loading from "@/loading";
import { WorkOrderData, ProjectData, ResourceWorkOdderData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../../common/data-table";
import { getAllWorkOrder } from "@/data/work-order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllProject } from "@/data/projects";
import { workOrderColumns } from "./workOrderColumn";
import { projectColumns } from "./projectColumn";
import { workOrderListcolumns } from "./resourceWorkOrderColumn";
import { getAllResourceWorkOrder } from "@/data/resource-work-order";
import {
  projectController,
  resourceController,
  workOrderController,
} from "@/config/const";

const ClosedProject = () => {
  const {
    data: workOrders,
    error: workOrderError,
    isLoading: workOrderLoading,
  } = useQuery({
    queryKey: ["work-orders"],
    queryFn: async () => {
      const data = await getAllWorkOrder();
      const newWorkOrderData = JSON.parse(data.data) as WorkOrderData[];
      return newWorkOrderData.filter((info) => info.status === "Closed");
    },
  });

  const {
    data: projects,
    error: projectError,
    isLoading: projectLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await getAllProject();
      const newProject = JSON.parse(data.data) as ProjectData[];
      return newProject.filter((info) => info.status === "Closed");
    },
  });

  const {
    data: resourceWorkOrder,
    error: resourceError,
    isLoading: resourceLoading,
  } = useQuery({
    queryKey: ["resource-work-orders"],
    queryFn: async () => {
      const data = await getAllResourceWorkOrder();
      const newResourceData = JSON.parse(data.data) as ResourceWorkOdderData[];
      return newResourceData.filter((info) => info.status === "Closed");
    },
  });

  console.log(projects!);

  return (
    <Tabs defaultValue="project" className="w-full">
      <TabsList className="bg-theme text-white">
        <TabsTrigger value="project">Closed Project</TabsTrigger>
        <TabsTrigger value="workOrder">Closed Work Order</TabsTrigger>
        <TabsTrigger value="resource">Closed Work Order Resource</TabsTrigger>
      </TabsList>
      <TabsContent value="project">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {projectError || projectLoading ? (
            <div className="w-full min-h-[500px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={projectColumns}
                data={projects!}
                searchName="project_id"
                fileName="Project"
                exportDataFields={projectController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="workOrder">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {workOrderError || workOrderLoading ? (
            <div className="w-full min-h-[500px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={workOrderColumns}
                data={workOrders!}
                searchName="work_order_id"
                fileName="WorkOrder"
                exportDataFields={workOrderController}
              />
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="resource">
        <div className="w-[100%] h-auto bg-white ring-1 ring-theme shadow-sm rounded-sm">
          {resourceError || resourceLoading ? (
            <div className="w-full min-h-[500px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="w-full">
              <DataTable
                columns={workOrderListcolumns}
                data={resourceWorkOrder!}
                searchName="resourceId"
                fileName="ResourceWorkOrder"
                exportDataFields={resourceController}
              />
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ClosedProject;
