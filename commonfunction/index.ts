import { getAllProject } from "@/data/projects";
import { getAllWorkOrder } from "@/data/work-order";

export async function fetchProjectId() {
  const data = await getAllProject();
  const parsedData = JSON.parse(data.data) as any[];
  return parsedData;
}

export async function fetchWorkOrderId(project_id: string) {
  const data = await getAllWorkOrder();
  const parsedData = JSON.parse(data.data) as any[];
  const filteredData = parsedData
    .filter((data) => data.project_id === project_id)
    .map((data) => data.work_order_id);
  return filteredData;
}
